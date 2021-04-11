class Crime < ApplicationRecord
    private
    def self.attributes_protected_by_default
        []
    end
end
