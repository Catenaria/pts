class FichasPtsController < ApplicationController
  before_action :set_fichas_pt, only: [:show, :edit, :update, :destroy]

  # GET /fichas_pts
  # GET /fichas_pts.json
  def index
    @fichas_pts = FichasPt.all
  end

  # GET /fichas_pts/1
  # GET /fichas_pts/1.json
  def show
  end

  # GET /fichas_pts/new
  def new
    @fichas_pt = FichasPt.new
  end

  # GET /fichas_pts/1/edit
  def edit
  end

  # POST /fichas_pts
  # POST /fichas_pts.json
  def create
    @fichas_pt = FichasPt.new(fichas_pt_params)

    respond_to do |format|
      if @fichas_pt.save
        format.html { redirect_to @fichas_pt, notice: 'Fichas pt was successfully created.' }
        format.json { render :show, status: :created, location: @fichas_pt }
      else
        format.html { render :new }
        format.json { render json: @fichas_pt.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /fichas_pts/1
  # PATCH/PUT /fichas_pts/1.json
  def update
    respond_to do |format|
      if @fichas_pt.update(fichas_pt_params)
        format.html { redirect_to @fichas_pt, notice: 'Fichas pt was successfully updated.' }
        format.json { render :show, status: :ok, location: @fichas_pt }
      else
        format.html { render :edit }
        format.json { render json: @fichas_pt.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fichas_pts/1
  # DELETE /fichas_pts/1.json
  def destroy
    @fichas_pt.destroy
    respond_to do |format|
      format.html { redirect_to fichas_pts_url, notice: 'Fichas pt was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fichas_pt
      @fichas_pt = FichasPt.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def fichas_pt_params
      params.require(:fichas_pt).permit(:ficha_id, :pt_id)
    end
end
