class DocsController < ApplicationController
  # GET /docs
  # GET /docs.json
  def index
    @docs = Doc.all

    render json: @docs
  end

  # GET /docs/1
  # GET /docs/1.json
  def show
    @doc = Doc.find(params[:id])

    render json: @doc
  end

  # POST /docs
  # POST /docs.json
  def create
    @doc = Doc.new(params[:doc])

    if @doc.save
      render json: @doc, status: :created, location: @doc
    else
      render json: @doc.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /docs/1
  # PATCH/PUT /docs/1.json
  def update
    @doc = Doc.find(params[:id])

    if @doc.update(params[:doc])
      head :no_content
    else
      render json: @doc.errors, status: :unprocessable_entity
    end
  end

  # DELETE /docs/1
  # DELETE /docs/1.json
  def destroy
    @doc = Doc.find(params[:id])
    @doc.destroy

    head :no_content
  end
end
