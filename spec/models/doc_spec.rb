require 'spec_helper'

describe Doc do
  describe "attributes" do
    subject { described_class.new }
    let(:doc) { build :doc }
    it { should respond_to (:title) }
    it { should respond_to (:title=) }
    it { should respond_to (:content) }
    it { should respond_to (:content=) }
    it { should respond_to (:tags) }
    it { should respond_to (:tags=) }
    let(:title) { "" }
    it "are invalid without a title" do
      expect(subject.valid?).to be_falsey
    end

    # it "are valid with title" do
    #   subject.title = title
    #   subject.content = "asdf"
    #   expect(subject.valid?).to be_truthy
    # end
  end
end
