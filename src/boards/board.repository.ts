import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CustomRepository } from 'src/configs/typeorm-ex.decorator';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    const insertedBoard = await this.save(board);
    return insertedBoard;
  }
}
