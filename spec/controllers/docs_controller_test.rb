require 'spec_helper'

class DocsControllerTest < ActionController::TestCase
  setup do
    @doc = docs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:docs)
  end

  test "should create doc" do
    assert_difference('Doc.count') do
      post :create, doc: { content: @doc.content, tags: @doc.tags, title: @doc.title }
    end

    assert_response 201
  end

  test "should show doc" do
    get :show, id: @doc
    assert_response :success
  end

  test "should update doc" do
    put :update, id: @doc, doc: { content: @doc.content, tags: @doc.tags, title: @doc.title }
    assert_response 204
  end

  test "should destroy doc" do
    assert_difference('Doc.count', -1) do
      delete :destroy, id: @doc
    end

    assert_response 204
  end
end
