class Doc < ActiveRecord::Base
  require 'set'
  validates :title, presence: true
  scope :by_tag, ->(name) { where("'#{name}' = ANY (tags)") if name.present? }
  scope :by_title, ->(name) { where("title ILIKE ?", name) if name.present? }

  def self.all_tags
    tags = []
    Doc.all.map {|d| tags << d.tags }
    tags.to_set.to_a.flatten
  end
end
