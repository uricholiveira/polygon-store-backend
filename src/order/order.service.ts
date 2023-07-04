import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const initialStatus = await this.prisma.orderStatus.findFirst({
      where: {
        description: 'created',
      },
    });

    const order = await this.prisma.order.create({
      data: {
        referenceId: createOrderDto.referenceId,
        orderStatusId: initialStatus.id,
        totalAmount: createOrderDto.items.reduce((x, item) => {
          return x + item.amount * item.quantity;
        }, 0),
      },
    });

    const itemsDto: {
      variantId: number;
      productId: number;
      amount: number;
      orderId: number;
    }[] = [];

    createOrderDto.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        itemsDto.push({
          variantId: item.variant.id,
          productId: item.product.id,
          amount: item.variant.value,
          orderId: order.id,
        });
      }
    });

    const items = await this.prisma.orderItems.createMany({
      data: itemsDto,
    });

    return this.prisma.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        status: true,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        status: true,
      },
    });
  }

  async findByReferenceId(referenceId: string) {
    return this.prisma.order.findFirst({
      where: {
        referenceId: {
          equals: referenceId,
        },
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        status: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        status: true,
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const status = await this.prisma.orderStatus.findFirst({
      where: {
        description: updateOrderDto.status,
      },
    });

    await this.prisma.order.update({
      where: {
        id: id,
      },
      data: {
        status: {
          connect: {
            id: status.id,
          },
        },
      },
    });

    return this.prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        status: true,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
