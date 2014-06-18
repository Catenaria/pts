class CreateFichas < ActiveRecord::Migration
  def change
    create_table :fichas do |t|
      t.string :des
      t.integer :pv

      t.timestamps
    end
  end
end
