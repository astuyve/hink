require 'spec_helper'

describe Doc do
  describe "attributes" do
    subject { described_class.new }
    let(:doc) { create :doc }
    it { should respond_to (:title) }
    it { should respond_to (:title=) }
    it { should respond_to (:content) }
    it { should respond_to (:content=) }
    it { should respond_to (:tags) }
    it { should respond_to (:tags=) }
    it "are invalid without a title" do
      expect(subject.valid?).to be_falsey
    end

    it "are valid with title" do
      subject.title = "derp"
      subject.content = "asdf"
      expect(subject.valid?).to be_truthy
    end
    context "scope by tag" do
      it "retrieves by tag" do
        expect(Doc.by_tag('one')).to include(doc)
      end
      it "returns nothing for bad tags" do
        expect(Doc.by_tag('not')).not_to include(doc)
      end
    end
    context "scope by title" do
      it "retrieves by title" do
        expect(Doc.by_title('A note')).to include(doc)
      end
      it "returns nothing for bad title" do
        expect(Doc.by_title('not')).not_to include(doc)
      end
    end
  end
end
