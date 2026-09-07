export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'

function detectDefaultDebug(): boolean {
	// 1. In Vite dev server (pnpm dev), enable debug logging automatically (excluding vitest test environment)
	if (typeof import.meta !== 'undefined' && import.meta.env) {
		if (import.meta.env.DEV && import.meta.env.MODE !== 'test') {
			return true
		}
	}

	// 2. Node / process environment flag
	if (
		typeof process !== 'undefined' &&
		process.env &&
		(process.env.DEBUG === 'true' || process.env.DEBUG === '1')
	) {
		return true
	}

	// 3. Browser global flag (e.g. window.DEBUG_LOG = true)
	if (typeof window !== 'undefined') {
		const flag = (window as unknown as Record<string, unknown>).DEBUG_LOG
		if (flag === true || flag === 'true' || flag === '1') {
			return true
		}
	}

	return false
}

let isDebugEnabled = detectDefaultDebug()

function formatAndLog(
	level: LogLevel,
	emoji: string,
	context: string,
	message: string,
	details?: unknown,
	logFn: (...data: unknown[]) => void = console.log,
	debugOnly = false
): void {
	if (debugOnly && !isDebugEnabled) return
	const ctxStr = context.startsWith('[') && context.endsWith(']') ? context : `[${context}]`
	const extra =
		details !== undefined
			? details instanceof Error
				? `\n${details.stack || details.message}`
				: typeof details === 'object' && details !== null
					? `\n${JSON.stringify(details, null, 2)}`
					: ` ${details}`
			: ''
	logFn(`${emoji} [${level}] ${ctxStr} ${message}${extra}`)
}

/**
 * Unified Centralized Logger per development workflow and clean code guidelines.
 */
export const Logger = {
	setDebug: (value: boolean): void => {
		isDebugEnabled = !!value
	},
	isDebug: (): boolean => isDebugEnabled,
	info: (ctx: string, msg: string, details?: unknown) =>
		formatAndLog('INFO', '✅', ctx, msg, details, console.log, true),
	warn: (ctx: string, msg: string, details?: unknown) =>
		formatAndLog('WARN', '⚠️', ctx, msg, details, console.warn, false),
	error: (ctx: string, msg: string, details?: unknown) =>
		formatAndLog('ERROR', '❌', ctx, msg, details, console.error, false),
	debug: (ctx: string, msg: string, details?: unknown) =>
		formatAndLog('DEBUG', '🔍', ctx, msg, details, console.log, true),
	perf: (ctx: string, msg: string, ms: number) =>
		formatAndLog('DEBUG', '⏱️', ctx, `${msg} (${ms}ms)`, undefined, console.log, true),
}

export function setDebug(value: boolean): void {
	Logger.setDebug(value)
}

export function isDebug(): boolean {
	return Logger.isDebug()
}
