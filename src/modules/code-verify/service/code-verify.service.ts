import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeVerify } from '../entities/code-verify.entities';

@Injectable()
export class CodeVerifyService {
  constructor(
    @InjectRepository(CodeVerify)
    private readonly codeRepository: Repository<CodeVerify>,
  ) {}

  makeCodeRandom(length: number) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async findOne(id: number): Promise<CodeVerify> {
    return this.codeRepository.findOne({ where: { id } });
  }

  async findByCodeAndCId(cId: number, code: string): Promise<CodeVerify> {
    return this.codeRepository.findOne({ where: { cId, code } });
  }

  async create(id: number): Promise<CodeVerify> {
    const minutesExpired = 5;
    const codeItem = new CodeVerify();
    codeItem.cId = id;
    codeItem.code = this.makeCodeRandom(6);
    codeItem.expired = new Date(Date.now() + minutesExpired * 60 * 1000);

    try {
      const result = await this.codeRepository.save(codeItem);
      return result;
    } catch (error) {
      console.log({ error });
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number): Promise<any> {
    const deleteResponse = await this.codeRepository.delete(id);
    return deleteResponse;
  }
}
