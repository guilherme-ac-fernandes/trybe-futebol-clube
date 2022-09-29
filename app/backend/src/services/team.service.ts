import TeamModel from '../model/TeamModel';

export default class TeamService {
  constructor(private model = new TeamModel()) {}

  public async findAll() {
    const teams = await this.model.findAll();
    if (!teams) {
      return { code: 404, message: 'Not found any team' };
    }
    return { code: 200, data: teams };
  }
}
