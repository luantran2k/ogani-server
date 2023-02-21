import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Period } from 'src/types/type';
import ultis from 'src/utils/ultis';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { verificationCode, ...userData } = createUserDto;
    return this.prisma.user.create({
      data: { ...userData, avatar: await this.getRandomAvatar() },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        name: true,
        email: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  findByUsername(username: string) {
    return this.prisma.user.findFirst({ where: { username } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
      select: { email: true },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    userRequestId?: number,
  ) {
    const { password, ...data } = updateUserDto;
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (userRequestId && user.id !== userRequestId) {
      throw new ForbiddenException(
        'Bạn không có quyền chỉnh sửa' + userRequestId + ' ' + user.id,
      );
    }
    if (password) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new BadRequestException('Mật khẩu không đúng');
      }
    }
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        phone: true,
      },
    });
  }

  updateByEmail(email: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { email }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getRandomAvatar() {
    const fileInfo = await this.cloudinary.getAllFileInFolder(
      'dethiviet/image/avatar/default',
      {
        resourceType: 'image',
      },
    );
    const numberOfFiles = fileInfo.total_count;
    const randomNumber = Math.floor(Math.random() * numberOfFiles);
    return fileInfo.resources[randomNumber].url;
  }

  getInfo(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        email: true,
        createdAt: true,
        phone: true,
        role: true,
      },
    });
  }

  async countNewUser(period: Period = 'week') {
    const beginDate = ultis.getBeginDate(period, new Date());
    return this.prisma.user.count({
      where: {
        createdAt: {
          gte: beginDate,
        },
      },
    });
  }

  async aggregateUsers() {
    const usersByMonths: { createdAt: string; count: number }[] = await this
      .prisma.$queryRaw`
    SELECT
    DATE_TRUNC('month',"createdAt")
      AS  "createdAt",
    COUNT(id)::int AS count
    FROM "User"
    GROUP BY DATE_TRUNC('month',"createdAt");`;
    const data = usersByMonths
      .map((usersByMonth) => ({
        month: new Date(usersByMonth.createdAt).getMonth() + 1,
        count: usersByMonth.count,
      }))
      .sort((a, b) => a.month - b.month);
    return {
      label: 'Người dùng mới',
      data,
    };
  }

  removeUsers(ids: number[]) {
    return this.prisma.user.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
