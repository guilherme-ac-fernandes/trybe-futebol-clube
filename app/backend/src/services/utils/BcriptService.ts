import { hashSync, compareSync } from 'bcryptjs';

// Função baseada na resolução do exercício da mentoria de revisão do Especialista Lucas Henrique de Abreu
// presente do repositório das aulas ao vivo da turma 20B
// source: https://github.com/tryber/sd-020-b-live-lectures/blob/lectures-solid-poo-tdd-typescript-sequelize/src/services/utils/BcriptService.ts
export default class BcryptService {
  private static salt = 10;

  public static encrypt(text: string): string {
    return hashSync(text, this.salt);
  }

  public static compare(encryptText: string, planText: string): boolean {
    return compareSync(planText, encryptText);
  }
}
