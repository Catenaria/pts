class CreateFichasPts < ActiveRecord::Migration
  def change
    create_table :fichas_pts do |t|
      t.integer :ficha_id
      t.integer :pt_id

      t.timestamps
    end
  end
end
