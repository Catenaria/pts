class AddModel3dToFichas < ActiveRecord::Migration
  def change
    add_column :fichas, :model3d, :string
  end
end
