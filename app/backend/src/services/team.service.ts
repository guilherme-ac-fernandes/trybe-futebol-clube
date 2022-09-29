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

  public async findByPk(id: number) {
    const team = await this.model.findByPk(id);
    if (!team) {
      return { code: 404, message: 'Team Not found' };
    }
    return { code: 200, data: team };
  }
}
