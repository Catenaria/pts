json.array!(@fichas) do |ficha|
  json.extract! ficha, :id, :des, :pv
  json.url ficha_url(ficha, format: :json)
end
