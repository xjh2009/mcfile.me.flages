import { DisabledOptions } from "./interface/DisabledOptions";

/**
 * Additional configuration for Aikar's flags.
 */
const aikarsFlags = {
    "base": "-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true",
    "standard": "-XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20",
    "large": "-XX:G1NewSizePercent=40 -XX:G1MaxNewSizePercent=50 -XX:G1HeapRegionSize=16M -XX:G1ReservePercent=15"
};

/**
 * Options for the flag results.
 */
interface ResultOptions extends PrefixOptions, SuffixOptions {};

/**
 * Options for the flag prefix.
 */
interface PrefixOptions {
    /**
     * The amount of memory to allocate in gigabytes.
     */
    "memory": number,

    /**
     * Whether to recalculate memory and add flags for Pterodactyl's console.
     */
    "pterodactyl": boolean,

    /**
     * Whether to add incubating vector flags for modern versions of Java Hotspot.
     */
    "modernVectors": boolean,
}

/**
 * Options for the flag suffix.
 */
interface SuffixOptions {
    /**
     * Filename to start.
     */
    "filename": string,

    /**
     * Whether to enable the GUI.
     */
    "gui": boolean
}

/**
 * A flag type.
 */
export interface FlagType {
    /**
     * The key utilized in the flag selector.
     */
    "key": string,

    /**
     * The label to use in the flag selector.
     */
    "label": string,

    /**
     * The description to use in the flag selector.
     */
    "description"?: string,

    /**
     * The function used to get the results.
     */
    "result": ({ memory, filename, gui, modernVectors }: ResultOptions) => string,

    /**
     * Options for the disabled components.
     */
    "disabled"?: DisabledOptions
}

/**
 * Interface for the Flags object.
 */
export interface FlagsInterface {
    /**
     * The default flags.
     */
    "default": FlagType,

    /**
     * Flag types.
     */
    "types": {
        [key: string]: FlagType
    },

    /**
     * Prefix of every flag type.
     */
    "prefix": ({ memory, modernVectors }: PrefixOptions) => string,

    /**
     * Suffix of every flag type.
     */
    "suffix": ({ filename, gui }: SuffixOptions) => string
}

/**
 * The flags that are available to the app.
 */
export const Flags: FlagsInterface = {
    get "default"() {
        return this.types.aikars;
    },
    "types": {
        "none": {
            "key": "none",
            "label": "None",
            "description": "啥都不加",
            "result": ({ memory, filename, gui, pterodactyl, modernVectors }) => {
                return `${Flags.prefix({ memory, pterodactyl, modernVectors })} ${Flags.suffix({ filename, gui })}`;
            }
        },
        "aikars": {
            "key": "aikars",
            "label": "Aikar's Flags",
            "description": "非常高性能、且十分流行的服务器启动参数",
            "result": ({ memory, filename, gui, pterodactyl, modernVectors }) => {
                const base = `${aikarsFlags.base} ${memory >= 12 ? aikarsFlags.large : aikarsFlags.standard}`;
                return `${Flags.prefix({ memory, pterodactyl, modernVectors })} ${base} ${Flags.suffix({ filename, gui })}`;
            }
        },
        "nitwiki": {
            "key": "nitwiki",
            "label": "NitWiki Flags",
            "description": "笨蛋教程的启动参数 会出现村民变傻等现象",
            "result": ({ memory, filename, gui, pterodactyl, modernVectors }) => {
                const base = `-XX:+UnlockExperimentalVMOptions -XX:+UnlockDiagnosticVMOptions -XX:+UseFMA -XX:+UseVectorCmov -XX:+UseNewLongLShift -XX:+UseFastStosb -XX:+SegmentedCodeCache -XX:+OptimizeStringConcat -XX:+DoEscapeAnalysis -XX:+OmitStackTraceInFastThrow -XX:+AlwaysActAsServerClassMachine -XX:+AlwaysPreTouch -XX:+DisableExplicitGC -XX:NmethodSweepActivity=1 -XX:ReservedCodeCacheSize=400M -XX:NonNMethodCodeHeapSize=12M -XX:ProfiledCodeHeapSize=194M -XX:NonProfiledCodeHeapSize=194M -XX:-DontCompileHugeMethods -XX:MaxNodeLimit=240000 -XX:NodeLimitFudgeFactor=8000 -XX:+UseVectorCmov -XX:+PerfDisableSharedMem -XX:+UseFastUnorderedTimeStamps -XX:+UseCriticalJavaThreadPriority -XX:ThreadPriorityPolicy=1 -XX:AllocatePrefetchStyle=3 -XX:+UseG1GC -XX:MaxGCPauseMillis=37 -XX:+PerfDisableSharedMem -XX:G1HeapRegionSize=16M -XX:G1NewSizePercent=23 -XX:G1ReservePercent=20 -XX:SurvivorRatio=32 -XX:G1MixedGCCountTarget=3 -XX:G1HeapWastePercent=20 -XX:InitiatingHeapOccupancyPercent=10 -XX:G1RSetUpdatingPauseTimePercent=0 -XX:MaxTenuringThreshold=1 -XX:G1SATBBufferEnqueueingThresholdPercent=30 -XX:G1ConcMarkStepDurationMillis=5.0 -XX:GCTimeRatio=99 -XX:G1ConcRefinementServiceIntervalMillis=150 -XX:G1ConcRSHotCardLimit=16`;
                return `${Flags.prefix({ memory, pterodactyl, modernVectors })} ${base} ${Flags.suffix({ filename, gui })}`;
            }
        },
        "velocity": {
            "key": "velocity",
            "label": "Velocity & Waterfall",
            "description": "适用于群组服的代理服务器",
            "result": ({ memory, filename, gui, pterodactyl, modernVectors }) => {
                const base = "-XX:+UseG1GC -XX:G1HeapRegionSize=4M -XX:+UnlockExperimentalVMOptions -XX:+ParallelRefProcEnabled -XX:+AlwaysPreTouch -XX:MaxInlineLevel=15";
                return `${Flags.prefix({ memory, pterodactyl, modernVectors })} ${base} ${Flags.suffix({ filename, gui })}`;
            },
            "disabled": {
                "gui": true,
                "modernVectors": true
            }
        }
    },
    "prefix": ({ memory, pterodactyl, modernVectors }) => {
        const displayMemory = `${(memory * 1024)?.toFixed(0)}M`;
        let base = `java -Xms${memory >= 1 ? "1024M" : "512M"} -Xmx${displayMemory}`;

        // Pterodactyl flags
        if (pterodactyl) {
            base += " -Dterminal.jline=false -Dterminal.ansi=true";
        }

        // SIMD vectors
        if (modernVectors) {
            base += " --add-modules=jdk.incubator.vector";
        }

        return base;
    },
    "suffix": ({ filename, gui }) => {
        return `-jar ${filename} ${!gui ? "--nogui" : ""}`.trim();
    }
};
