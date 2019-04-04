# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_27_074238) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_books", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "ckb_transaction_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_account_books_on_account_id"
    t.index ["ckb_transaction_id"], name: "index_account_books_on_ckb_transaction_id"
  end

  create_table "accounts", force: :cascade do |t|
    t.bigint "balance"
    t.binary "address_hash"
    t.decimal "cell_consumed", precision: 64, scale: 2
    t.bigint "ckb_transactions_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address_hash"], name: "index_accounts_on_address_hash", unique: true
  end

  create_table "blocks", force: :cascade do |t|
    t.binary "cellbase_id"
    t.binary "difficulty"
    t.binary "block_hash"
    t.bigint "number"
    t.binary "parent_hash"
    t.jsonb "seal"
    t.bigint "timestamp"
    t.binary "txs_commit"
    t.binary "txs_proposal"
    t.integer "uncles_count"
    t.binary "uncles_hash"
    t.binary "uncle_block_hashes"
    t.integer "version"
    t.binary "proposal_transactions"
    t.integer "proposal_transactions_count"
    t.decimal "cell_consumed", precision: 64, scale: 2
    t.binary "miner_hash"
    t.integer "status"
    t.integer "reward"
    t.integer "total_transaction_fee"
    t.bigint "ckb_transactions_count", default: 0
    t.decimal "total_cell_capacity", precision: 64, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["block_hash", "status"], name: "index_blocks_on_block_hash_and_status"
    t.index ["block_hash"], name: "index_blocks_on_block_hash", unique: true
    t.index ["number", "status"], name: "index_blocks_on_number_and_status"
  end

  create_table "cell_inputs", force: :cascade do |t|
    t.jsonb "previous_output"
    t.string "args", array: true
    t.bigint "ckb_transaction_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ckb_transaction_id"], name: "index_cell_inputs_on_ckb_transaction_id"
  end

  create_table "cell_outputs", force: :cascade do |t|
    t.decimal "capacity", precision: 32, scale: 2
    t.binary "data"
    t.bigint "ckb_transaction_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ckb_transaction_id"], name: "index_cell_outputs_on_ckb_transaction_id"
  end

  create_table "ckb_transactions", force: :cascade do |t|
    t.binary "tx_hash"
    t.jsonb "deps"
    t.bigint "block_id"
    t.bigint "block_number"
    t.bigint "block_timestamp"
    t.jsonb "display_inputs"
    t.jsonb "display_outputs"
    t.integer "status"
    t.integer "transaction_fee"
    t.integer "version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["block_id"], name: "index_ckb_transactions_on_block_id"
    t.index ["tx_hash", "status"], name: "index_ckb_transactions_on_tx_hash_and_status"
    t.index ["tx_hash"], name: "index_ckb_transactions_on_tx_hash", unique: true
  end

  create_table "lock_scripts", force: :cascade do |t|
    t.string "args", array: true
    t.binary "binary_hash"
    t.integer "version"
    t.bigint "cell_output_id"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_lock_scripts_on_account_id"
    t.index ["cell_output_id"], name: "index_lock_scripts_on_cell_output_id"
  end

  create_table "sync_infos", force: :cascade do |t|
    t.string "name"
    t.bigint "value"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "status"], name: "index_sync_infos_on_name_and_status"
    t.index ["name"], name: "index_sync_infos_on_name", unique: true
  end

  create_table "type_scripts", force: :cascade do |t|
    t.string "args", array: true
    t.binary "binary_hash"
    t.integer "version"
    t.bigint "cell_output_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cell_output_id"], name: "index_type_scripts_on_cell_output_id"
  end

  create_table "uncle_blocks", force: :cascade do |t|
    t.binary "cellbase_id"
    t.binary "difficulty"
    t.binary "block_hash"
    t.bigint "number"
    t.binary "parent_hash"
    t.jsonb "seal"
    t.bigint "timestamp"
    t.binary "txs_commit"
    t.binary "txs_proposal"
    t.integer "uncles_count"
    t.binary "uncles_hash"
    t.integer "version"
    t.binary "proposal_transactions"
    t.integer "proposal_transactions_count"
    t.binary "miner_hash"
    t.integer "status"
    t.integer "reward"
    t.integer "total_transaction_fee"
    t.bigint "block_id"
    t.jsonb "cellbase"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["block_hash", "status"], name: "index_uncle_blocks_on_block_hash_and_status"
    t.index ["block_hash"], name: "index_uncle_blocks_on_block_hash", unique: true
    t.index ["block_id"], name: "index_uncle_blocks_on_block_id"
  end

end
