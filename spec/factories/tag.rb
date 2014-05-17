FactoryGirl.define do
  factory :tags, class: "Tag" do
    trait :one do
      name "one"
    end
    trait :two do
      name "two"
    end

  end
end
