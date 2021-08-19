import {EntityRepository, Repository} from 'typeorm';
import Apis from '../entities/apis';

@EntityRepository(Apis)
export default class ApiRepository extends Repository<Apis> {

	public findByName(name: string): Promise<Apis> {
		return this.findOne({
			where: {
				name,
			},
		});
	}
}
