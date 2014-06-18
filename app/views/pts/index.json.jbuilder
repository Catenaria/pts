json.array!(@pts) do |pt|
  json.extract! pt, :id, :des
  json.url pt_url(pt, format: :json)
end
