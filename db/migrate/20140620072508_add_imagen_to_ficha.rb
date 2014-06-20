class AddImagenToFicha < ActiveRecord::Migration
  def change
    add_column :fichas, :imagen_fn, :string
  end
end
