FactoryGirl.define do
  factory :doc, class: "Doc" do
    title "A note"
    content "content"
    tags do
      [create(:tags, :one), create(:tags, :two)]
    end

    trait :nil_title do
      title nil
    end

    trait :no_tags do
      tags []
    end
  end
end
