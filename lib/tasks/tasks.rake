# ## imports the CSV files
require "csv"
require "open-uri"
require 'activerecord-import'

task import_data: :environment do
    
    crimes = []
    premises = []
    regionalities = []
    weapons = []
    offences = []

    offence_crimes = []
    premis_crimes = []
    weapon_crimes = []
    victim_crimes = []

    i = 0

    url = "https://moralyzer-data-stream-1.s3.us-east-2.amazonaws.com/Crime_Data_from_2010_to_2019.csv"
    url_data = open(url)  

    symbolize_converter = lambda { |header| header.parameterize.underscore.to_sym }
    CSV.foreach(url_data, headers: true, header_converters: symbolize_converter) do |row|
        
        puts "record no: #{i}"
        i = i + 1

        ## entities
        crimes << {     
            date_rptd: row[:date_rptd],
            date_occured: row[:date_occ], 
            time_occured: row[:time_occ],
            id: row[:dr_no]
        }

        if row[:weapon_desc] && row[:weapon_used_cd]

            weapons << {
                id: row[:weapon_used_cd],
                description: row[:weapon_desc]
            }

        end

        victim = Victim.create(
            sex: row[:vict_sex],
            descent: row[:vict_descent],
            age: row[:vict_age]
        )

        regionalities << {
            location: row[:location],
            lat: row[:lat],
            long: row[:long],
            area: row[:area_name],
            crime_id: row[:dr_no]
        }

        premises << {
            description: row[:premis_desc],
            id: row[:premis_cd]
        }

        offences << {
            description: row[:crm_cd_desc],
            id: row[:crm_cd]
        }

        ## junction objects
        offence_crimes << {
            offence_id: row[:crm_cd],
            crime_id: row[:dr_no]
        }

        premis_crimes << {
            premis_id: row[:premis_cd],
            crime_id: row[:dr_no]
        }

        if row[:weapon_desc] && row[:weapon_used_cd]

        weapon_crimes << {
            weapon_id: row[:weapon_used_cd],
            crime_id: row[:dr_no]
        }

        end

        victim_crimes << {
            victim_id: victim.id,
            crime_id: row[:dr_no]
        }

    end

    ## entities
    Crime.import(crimes, :on_duplicate_key_ignore => true)
    Weapon.import(weapons, :on_duplicate_key_ignore => true)
    Regionality.import(regionalities, :on_duplicate_key_ignore => true)
    Premi.import(premises, :on_duplicate_key_ignore => true)
    Offence.import(offences, :on_duplicate_key_ignore => true)

    ## the junction objects
    OffenceCrime.import(offence_crimes, :on_duplicate_key_ignore => true)
    PremisCrime.import(premis_crimes, :on_duplicate_key_ignore => true)
    WeaponCrime.import(weapon_crimes, :on_duplicate_key_ignore => true)
    VictimCrime.import(victim_crimes, :on_duplicate_key_ignore => true)

end
