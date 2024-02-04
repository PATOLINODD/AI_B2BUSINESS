export interface MessageOBJ {
	code: number;
	error: boolean;
	result: any | string | Object;
	msg: string;
}