class Pt < ActiveRecord::Base
  has_and_belongs_to_many :fichas

  def pv
    self.fichas.reduce(0) do |sum, ficha|
      sum + ficha.pv
    end
  end
end
