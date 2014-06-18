class Ficha < ActiveRecord::Base
  has_and_belongs_to_many :pts
end
