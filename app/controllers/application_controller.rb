class ApplicationController < ActionController::API
    def html
        render file: 'public/index.html'
    end

    def query
        results = ActiveRecord::Base.connection.exec_query("
            #{params[:query]}
        ")

        render json: results
    end

    def create

        # {
        #     "date_rptd" : "02/20/2010 12:00:00 AM",
        #     "time_occured" : "1350",
        #     "date_occured" : "02/20/2010 12:00:00 AM",
        #     "offence_desc" : "VIOLATION OF COURT ORDER",
        #     "area": "Newton",
        #     "premis_desc":"SINGLE FAMILY DWELLING",
        #     "weapon_desc": "HAND GUN",
        #     "lat": "33.9599",
        #     "long":"33.9599",
        #     "location":"300 E GAGE AV",
        #     "sex": "M",
        #     "descent" : "B",
        #     "age" : "12"
        # }

        crime = Crime.create(
            date_rptd: params[:date_rptd],
            date_occured: params[:date_occured],
            time_occured: params[:time_occured]
        )

        offence = Offence.find_or_create_by(
            description: params[:offence_desc]
        )

        premis = Premi.find_or_create_by(
            description: params[:premis_desc]
        )
        
        region = Regionality.create(
            location: params[:location],
            area: params[:area],
            lat: params[:lat],
            long: params[:long],
            crime_id: crime.id
        )
        
        weapon = Weapon.find_or_create_by(
            description: params[:weapon_desc]
        )

        victim = Victim.find_or_create_by(
            sex: params[:sex],
            descent: params[:descent],
            age: params[:age]
        )

        PremisCrime.create(
            premis_id: premis.id,
            crime_id: crime.id,
        )

        VictimCrime.create(
            victim_id: victim.id,
            crime_id: crime.id
        )

        OffenceCrime.create(
            offence_id: offence.id,
            crime_id: crime.id
        )

        WeaponCrime.create(
            crime_id: crime.id,
            weapon_id: weapon.id
        )

        head :created

    end

end
