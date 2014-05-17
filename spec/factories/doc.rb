FactoryGirl.define do
  factory :doc, class: "Doc" do
    title "A note"
    content "content"
    tags ['one', 'two']

    trait :nil_title do
      title nil
    end

    trait :no_tags do
      tags []
    end
  end
end
