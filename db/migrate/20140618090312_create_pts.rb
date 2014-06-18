class CreatePts < ActiveRecord::Migration
  def change
    create_table :pts do |t|
      t.string :des

      t.timestamps
    end
  end
end
