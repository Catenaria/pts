class AddImagenToPts < ActiveRecord::Migration
  def change
    add_column :pts, :imagen_fn, :string
  end
end
