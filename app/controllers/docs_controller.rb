class DocsController < ApplicationController
  before_action :set_doc, only: [:show, :edit, :update, :destroy]

  # GET /docs
  # GET /docs.json
  def index
    @docs = Doc.all

    render json: @docs
  end

  # GET /docs/1
  # GET /docs/1.json
  def show
    render json: @doc
  end

  # POST /docs
  # POST /docs.json
  def create
    @doc = Doc.new(doc_params)

    if @doc.save
      render json: @doc, status: :created, location: @doc
    else
      render json: @doc.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /docs/1
  # PATCH/PUT /docs/1.json
  def update
    if @doc.update(doc_params)
      head :no_content
    else
      render json: @doc.errors, status: :unprocessable_entity
    end
  end

  # DELETE /docs/1
  # DELETE /docs/1.json
  def destroy
    @doc.destroy

    head :no_content
  end

  private
    def set_doc
      @doc = Doc.find(params[:id])
    end

    def doc_params
      params.require(:doc).permit(:title, :content, :tags => []);
    end
end
