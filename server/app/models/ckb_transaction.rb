class CkbTransaction < ApplicationRecord
  enum status: { inauthentic: 0, authentic: 1, abandoned: 2 }

  belongs_to :block
  has_many :account_books
  has_many :accounts, through: :account_books
  has_many :cell_inputs
  has_many :cell_outputs

  validates_presence_of :transaction_fee, :status
  validates :transaction_fee, numericality: { greater_than_or_equal_to: 0 }

  def tx_hash
    "#{ENV['DEFAULT_HASH_PREFIX']}#{super.unpack1('H*')}" if super.present?
  end

  def tx_hash=(tx_hash)
    tx_hash = [tx_hash.delete_prefix(ENV["DEFAULT_HASH_PREFIX"])].pack("H*") if tx_hash.present?
    super
  end
end

# == Schema Information
#
# Table name: ckb_transactions
#
#  id              :bigint(8)        not null, primary key
#  tx_hash         :binary
#  deps            :jsonb
#  block_id        :bigint(8)
#  block_number    :bigint(8)
#  block_timestamp :bigint(8)
#  display_inputs  :jsonb
#  display_outputs :jsonb
#  status          :integer
#  transaction_fee :integer
#  version         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_ckb_transactions_on_block_id            (block_id)
#  index_ckb_transactions_on_tx_hash             (tx_hash) UNIQUE
#  index_ckb_transactions_on_tx_hash_and_status  (tx_hash,status)
#
