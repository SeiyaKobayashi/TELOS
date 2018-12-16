# -*- encoding: utf-8 -*-
# stub: d3_rails 4.1.1 ruby lib

Gem::Specification.new do |s|
  s.name = "d3_rails".freeze
  s.version = "4.1.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Michael Bostock".freeze, "Han Kang".freeze, "Cynthia Kiser".freeze, "Byron Anderson".freeze, "Johnathan Pulos".freeze]
  s.date = "2016-07-26"
  s.description = "Gem installation of javascript framework for data visualization, D3".freeze
  s.email = ["han@logicallsat.com".freeze]
  s.homepage = "https://github.com/logical42/d3_rails".freeze
  s.licenses = ["MIT".freeze]
  s.rubyforge_project = "d3_rails".freeze
  s.rubygems_version = "2.6.13".freeze
  s.summary = "D3 automated install for Rails 3.1+".freeze

  s.installed_by_version = "2.6.13" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<railties>.freeze, [">= 3.1.0"])
      s.add_development_dependency(%q<bundler>.freeze, [">= 1.0.0"])
      s.add_development_dependency(%q<rails>.freeze, [">= 3.1"])
      s.add_development_dependency(%q<pry>.freeze, [">= 0"])
    else
      s.add_dependency(%q<railties>.freeze, [">= 3.1.0"])
      s.add_dependency(%q<bundler>.freeze, [">= 1.0.0"])
      s.add_dependency(%q<rails>.freeze, [">= 3.1"])
      s.add_dependency(%q<pry>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<railties>.freeze, [">= 3.1.0"])
    s.add_dependency(%q<bundler>.freeze, [">= 1.0.0"])
    s.add_dependency(%q<rails>.freeze, [">= 3.1"])
    s.add_dependency(%q<pry>.freeze, [">= 0"])
  end
end
