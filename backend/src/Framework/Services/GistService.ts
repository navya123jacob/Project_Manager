import axios from 'axios';

export class GistService {
  private githubToken: string;

  constructor(githubToken: string) {
      this.githubToken = githubToken;
  }

  async createGist(title: string, content: string, token: string): Promise<string> {
      try {
          const response = await axios.post(
              'https://api.github.com/gists',
              {
                  description: title,
                  public: true,
                  files: {
                      'project_summary.md': {
                          content: content,
                      },
                  },
              },
              {
                  headers: {
                      Authorization: `token ${token}`,
                      'Content-Type': 'application/json',
                  },
              }
          );
          return response.data.html_url; 
      } catch (error) {
          console.error('GitHub API Error:',  (error as Error).message);
          throw new Error('Failed to create Gist');
      }
  }
}
