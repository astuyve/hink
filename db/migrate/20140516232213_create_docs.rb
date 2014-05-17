class CreateDocs < ActiveRecord::Migration
  def change
    create_table :docs do |t|
      t.string :title
      t.text :content
      t.string :tags, array: true, default: []

      t.timestamps
    end
  end
end
