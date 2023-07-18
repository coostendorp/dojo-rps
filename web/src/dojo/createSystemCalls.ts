import { SetupNetworkResult } from "./setupNetwork";
import {PAPER, ROCK, SCISSORS} from "../global/constants";


export function createSystemCalls(
    { execute, syncWorker }: SetupNetworkResult,
) {
    const create = async () => {
        const tx = await execute("create", []);
        await syncWorker.sync(tx.transaction_hash);
    };

    const commit = async (gameId: number, hashedCommit: bigint) => {
        const tx = await execute("commit", [gameId, hashedCommit]);
        await syncWorker.sync(tx.transaction_hash);
    };

    const reveal = async (
      gameId: number,
      hashedCommit: bigint,
      commit: typeof ROCK | typeof PAPER | typeof SCISSORS,
      salt: number
    ) => {
        const tx = await execute("reveal", [gameId, hashedCommit, commit, salt]);
        await syncWorker.sync(tx.transaction_hash);
    };

    const reset = async (gameId: number) => {
        const tx = await execute("reset", [gameId]);
        await syncWorker.sync(tx.transaction_hash);
    };

    return {
        create, commit, reveal, reset
    };
}