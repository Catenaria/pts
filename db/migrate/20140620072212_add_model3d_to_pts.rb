class AddModel3dToPts < ActiveRecord::Migration
  def change
    add_column :pts, :model3d_fn, :string
  end
end
