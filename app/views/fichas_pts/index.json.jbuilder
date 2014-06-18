json.array!(@fichas_pts) do |fichas_pt|
  json.extract! fichas_pt, :id, :ficha_id, :pt_id
  json.url fichas_pt_url(fichas_pt, format: :json)
end
