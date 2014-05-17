class Doc < ActiveRecord::Base
  validates :title, presence: true
  scope :by_tag, ->(name) { where("'#{name}' = ANY (tags)") if name.present? }
  scope :by_title, ->(name) { where("title ILIKE ?", name) if name.present? }
end
