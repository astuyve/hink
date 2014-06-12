module Defender
  def self.[](key)
    unless @config
      begin
        raw_config = File.read("#{Rails.root}/config/defender.yml")
        @config = YAML.load(raw_config)[Rails.env].symbolize_keys
      rescue
        @config = nil
      end
    end
    @config[key] if @config
  end

  def self.[]=(key, value)
    @config.present? ? @config[key.to_sym] = value : nil
  end
end
