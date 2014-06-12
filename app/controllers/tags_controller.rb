class TagsController < ApplicationController
  def index
    @docs = Doc.all
    @tags = @docs.all_tags
    render json: @tags
  end
end
