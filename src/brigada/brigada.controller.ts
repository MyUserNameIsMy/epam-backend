import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrigadaService } from './brigada.service';
import { CreateBrigadaDto } from './dto/create-brigada.dto';
import { UpdateBrigadaDto } from './dto/update-brigada.dto';

@Controller('brigada')
export class BrigadaController {
  constructor(private readonly brigadaService: BrigadaService) {}

  @Post()
  create(@Body() createBrigadaDto: CreateBrigadaDto) {
    return this.brigadaService.create(createBrigadaDto);
  }

  @Get()
  findAll() {
    return this.brigadaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brigadaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrigadaDto: UpdateBrigadaDto) {
    return this.brigadaService.update(+id, updateBrigadaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brigadaService.remove(+id);
  }
}
