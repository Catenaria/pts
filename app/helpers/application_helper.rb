module ApplicationHelper

  def store_url
     session[:return_to] = URI(request.referer).path
  end

end
