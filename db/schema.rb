# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_11_173251) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "crimes", force: :cascade do |t|
    t.string "date_rptd"
    t.string "date_occured"
    t.string "time_occured"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "offence_crimes", primary_key: ["crime_id", "offence_id"], force: :cascade do |t|
    t.bigint "offence_id", null: false
    t.bigint "crime_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["crime_id"], name: "index_offence_crimes_on_crime_id"
    t.index ["offence_id"], name: "index_offence_crimes_on_offence_id"
  end

  create_table "offences", force: :cascade do |t|
    t.string "description", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "premis", force: :cascade do |t|
    t.string "description", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "premis_crimes", primary_key: ["premis_id", "crime_id"], force: :cascade do |t|
    t.bigint "premis_id", null: false
    t.bigint "crime_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["crime_id"], name: "index_premis_crimes_on_crime_id"
    t.index ["premis_id"], name: "index_premis_crimes_on_premis_id"
  end

  create_table "regionalities", force: :cascade do |t|
    t.bigint "crime_id", null: false
    t.string "location"
    t.string "lat"
    t.string "long"
    t.string "area"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["crime_id"], name: "index_regionalities_on_crime_id"
  end

  create_table "victim_crimes", primary_key: ["victim_id", "crime_id"], force: :cascade do |t|
    t.bigint "victim_id", null: false
    t.bigint "crime_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["crime_id"], name: "index_victim_crimes_on_crime_id"
    t.index ["victim_id"], name: "index_victim_crimes_on_victim_id"
  end

  create_table "victims", force: :cascade do |t|
    t.string "sex"
    t.string "descent"
    t.integer "age"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "weapon_crimes", primary_key: ["weapon_id", "crime_id"], force: :cascade do |t|
    t.bigint "weapon_id", null: false
    t.bigint "crime_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["crime_id"], name: "index_weapon_crimes_on_crime_id"
    t.index ["weapon_id"], name: "index_weapon_crimes_on_weapon_id"
  end

  create_table "weapons", force: :cascade do |t|
    t.string "description", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "offence_crimes", "crimes"
  add_foreign_key "offence_crimes", "offences"
  add_foreign_key "premis_crimes", "crimes"
  add_foreign_key "premis_crimes", "premis", column: "premis_id"
  add_foreign_key "regionalities", "crimes"
  add_foreign_key "victim_crimes", "crimes"
  add_foreign_key "victim_crimes", "victims"
  add_foreign_key "weapon_crimes", "crimes"
  add_foreign_key "weapon_crimes", "weapons"
end
