class RepositoryServices
  include HTTParty

  base_uri ENV['GITHUB_URL']

  def initialize(text:, page: 1)
    @search = text
    @page = page
  end

  def call
    self.class.get(
      '/search/repositories',
      query: {
         q: search,
         per_page: 100,
         page: page
      },
      read_timeout: 10
    ).parsed_response['items']
  rescue StandardError
    raise 'Error fetching data from Github Repository'
  end

  private

  attr_reader :search, :page
end