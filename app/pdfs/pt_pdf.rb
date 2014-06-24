# -*- coding: utf-8 -*-
class PtPdf< Prawn::Document

  def initialize(pt)
    super()
    @pt = pt
    text "Description: #{@pt.des}"
    @data = [["Decripción", "precio"]]
    @pt.fichas.each do |ficha|
      @data += [[ficha.des, ficha.pv]]
    end
    @data += [["",@pt.pv]]
    table(@data, :header => true)
  end

end
