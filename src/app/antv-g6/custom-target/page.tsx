"use client";

import { useEffect, useRef, useState } from "react";

// Declare global interface for Tone.js and G6 to resolve TypeScript errors
declare global {
  interface Window {
    Tone: any; // Tone.js library
    G6: any; // G6 graph library
  }
}

// CSS for waveform animation (not used in family tree, but kept from original)
const waveformCss = `
  @keyframes waveform {
    0% { height: 25%; }
    25% { height: 75%; }
    50% { height: 50%; }
    75% { height: 100%; }
    100% { height: 25%; }
  }\
  .animate-waveform {
    animation: waveform 1.5s ease-in-out infinite alternate;
  }
`;

// Function to generate a random date and time within a specified range or last year (not used in family tree, but kept from original)
const getRandomDateTime = (
  startDate: string | null = null,
  endDate: string | null = null,
): Date => {
  let start = startDate
    ? new Date(startDate)
    : new Date(new Date().getFullYear() - 1, 0, 1); // Default to Jan 1 of last year
  let end = endDate ? new Date(endDate) : new Date(); // Default to now

  const randomTimestamp =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTimestamp);

  // Add random hours and minutes
  randomDate.setHours(Math.floor(Math.random() * 24));
  randomDate.setMinutes(Math.floor(Math.random() * 60));
  randomDate.setSeconds(0); // Set seconds to 0 for simplicity
  randomDate.setMilliseconds(0); // Set milliseconds to 0 for simplicity

  return randomDate;
};

// Function to format time as HH:MM (not used in family tree, but kept from original)
const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Define a type for a single call history item (not used in family tree, but kept from original)
interface CallHistoryItem {
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  durationSeconds: number;
  audioId: string;
}

// Function to generate dummy call history (not used in family tree, but kept from original)
const generateCallHistory = (
  count: number,
  startDate: string | null = null,
  endDate: string | null = null,
): CallHistoryItem[] => {
  const history: CallHistoryItem[] = [];
  for (let i = 0; i < count; i++) {
    const baseDate = getRandomDateTime(startDate, endDate);
    const durationMinutes = Math.floor(Math.random() * 5) + 1; // 1 to 5 minutes for a more practical demo
    const durationSeconds = durationMinutes * 60; // Store duration in seconds for Tone.js

    const startTime = baseDate;
    const endTime = new Date(startTime.getTime() + durationSeconds * 1000); // Add duration in milliseconds

    history.push({
      date: startTime.toLocaleDateString("en-GB"), // Format date as day/month/year
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      duration: `${durationMinutes} min`, // Display duration in minutes
      durationSeconds: durationSeconds, // Actual duration in seconds for audio playback
      audioId: `call-${i}-${Date.now() + i}`, // Unique ID for playback tracking
    });
  }
  // Sort by date and time, most recent first
  history.sort((a, b) => {
    const dateA = new Date(
      `${a.date.split("/").reverse().join("-")}T${a.startTime}`,
    );
    const dateB = new Date(
      `${b.date.split("/").reverse().join("-")}T${b.startTime}`,
    );
    return dateB.getTime() - dateA.getTime();
  });
  return history;
};

// Function to summarize call history as total calls and date range (not used in family tree, but kept from original)
const summarizeCallHistory = (callHistory: CallHistoryItem[]) => {
  if (!callHistory || callHistory.length === 0) {
    return "No call history available.";
  }

  const totalCalls = callHistory.length;
  // Dates are already sorted from most recent to oldest based on startTime
  const latestDate = new Date(
    callHistory[0].date.split("/").reverse().join("-"),
  ).toLocaleDateString("en-GB");
  const earliestDate = new Date(
    callHistory[callHistory.length - 1].date.split("/").reverse().join("-"),
  ).toLocaleDateString("en-GB");

  if (totalCalls === 1) {
    return `Total call: 1 on ${latestDate}`;
  } else if (latestDate === earliestDate) {
    return `Total calls: ${totalCalls} on ${latestDate}`;
  } else {
    return `Total calls: ${totalCalls} from ${earliestDate} to ${latestDate}`;
  }
};

// Generic Profile Icon SVG
const genericProfileSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#95a5a6">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
`;
const genericProfileSvgDataUrl = `data:image/svg+xml;base64,${btoa(genericProfileSvg)}`;

// Define a common interface for node styles
interface NodeStyle {
  fill: string;
  stroke: string;
  lineWidth: number;
}

// Define a union type for all possible node structures
interface BaseNode {
  id: string;
  label: string;
  description?: string;
  img?: string;
  style?: NodeStyle;
  category?: string;
  status?: string;
  comboId?: string; // Added comboId for nodes
}

interface PersonNode extends BaseNode {
  icNumber?: string;
  fullName?: string;
  currentAddress?: string;
  phoneNumber?: string;
  birthDate?: string; // Added for family tree
  siblingSequence?: string; // Added for family tree
  gender?: "male" | "female"; // Added gender for spouse generation
  // Specific properties for Hafizuddin's extended data
  assetType?: string;
  value?: string;
  companyName?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  accountType?: string; // Added for account details (e.g., "Credit Card", "Debit Card")
  bankName?: string; // Added for account details
  accountNumber?: string; // Added for account details
  balance?: string; // Added for account details
  creditUsed?: string; // Added for credit card usage
  address?: string; // Added for house address
  plateNumber?: string; // Added for car plate number
}

type NodeType = PersonNode; // Simplified for family tree

// Function to get a random color for the node circle
const getRandomColor = () => {
  const colors = [
    "#FF6347",
    "#4682B4",
    "#32CD32",
    "#FFD700",
    "#8A2BE2",
    "#FF69B4",
    "#00CED1",
    "#FF4500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Function to generate random IC number (kept from original)
const generateICNumber = () => {
  const year = String(Math.floor(Math.random() * (99 - 50 + 1)) + 50).padStart(
    2,
    "0",
  ); // 50-99
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
  const stateCode = String(Math.floor(Math.random() * 16) + 1).padStart(2, "0"); // 01-16
  const lastDigits = String(Math.floor(Math.random() * 10000)).padStart(4, "0"); // Use Math.floor
  return `${year}${month}${day}${stateCode}${lastDigits}`; // Removed hyphens
};

// Function to generate random phone number (kept from original)
const generatePhoneNumber = () => {
  const prefix = [
    "010",
    "011",
    "012",
    "013",
    "014",
    "016",
    "017",
    "018",
    "019",
  ];
  const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
  const suffix = String(Math.floor(Math.random() * 10000000)).padStart(7, "0"); // Use Math.floor
  return `${randomPrefix}${suffix}`; // Removed hyphen
};

// Function to generate random address (kept from original)
const generateAddress = () => {
  const streetNames = [
    "Jalan Bahagia",
    "Lorong Cempaka",
    "Persiaran Indah",
    "Taman Permai",
    "Jalan Anggerik",
  ];
  const cityNames = [
    "Kuala Lumpur",
    "Petaling Jaya",
    "Penang",
    "Johor Bahru",
    "Ipoh",
  ];
  const postcode = String(Math.floor(Math.random() * 90000) + 10000);
  const street = streetNames[Math.floor(Math.random() * streetNames.length)];
  const city = cityNames[Math.floor(Math.random() * cityNames.length)];
  return `${Math.floor(Math.random() * 100) + 1}, ${street}, ${postcode} ${city}`;
};

// Function to generate a random birth date (e.g., within last 50 years)
const generateRandomBirthDate = (startYear: number, endYear: number) => {
  const year =
    Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0"); // Max 28 for simplicity
  return `${day}/${month}/${year}`;
};

// Function to get sibling sequence string
const getSiblingSequence = (index: number) => {
  // Return just the index number, without any ordinal suffixes
  return String(index);
};

// Function to generate a random account number
const generateAccountNumber = () => {
  return Array(10)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");
};

// Function to generate a random balance
const generateRandomBalance = () => {
  return `MYR ${(Math.random() * 100000).toFixed(2)}`;
};

// Function to generate random credit used amount
const generateRandomCreditUsed = () => {
  return `MYR ${(Math.random() * 5000).toFixed(2)}`;
};

// Function to generate a random Malaysian plate number (e.g., ABC 1234)
const generatePlateNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetters = Array(3)
    .fill(0)
    .map(() => letters.charAt(Math.floor(Math.random() * letters.length)))
    .join("");
  const randomNumbers = String(Math.floor(Math.random() * 10000)).padStart(
    4,
    "0",
  );
  return `${randomLetters} ${randomNumbers}`;
};

// Function to fetch graph data from a JSON file
// const fetchData = async () => {
//   try {
//     // Construct an absolute URL using window.location.origin
//     const jsonUrl = `${window.location.origin}/data/family_tree_data.json`;
//     const response = await fetch(jsonUrl);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching family tree data:", error);
//     return { nodes: [], edges: [], combos: [] }; // Return empty data on error
//   }
// };
// Function to fetch graph data from MongoDB via API route
const fetchData = async () => {
  try {
    const response = await fetch("/api/family-tree");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching family tree data from API:", error);
    return { nodes: [], edges: [], combos: [] }; // Return empty data on error
  }
};

export default function Page() {
  const graphRef = useRef<G6GraphInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // Explicitly type containerRef
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const selectedItemRef = useRef<any | null>(null);
  const [isG6Loaded, setIsG6Loaded] = useState(false);

  // Tone.js related states and refs (not used for family tree, but kept from original)
  interface ToneSynthInstance {
    dispose(): void;
    triggerAttackRelease(note: string, duration: number): void;
    triggerRelease(): void;
  }
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const playingAudioIdRef = useRef<string | null>(null);
  const synthRef = useRef<ToneSynthInstance | null>(null);
  const audioTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadScript = (
      src: string,
      onLoad: () => void,
      onError: (event: Event | string) => void,
    ) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      script.onerror = onError as OnErrorEventHandler;
      document.head.appendChild(script);
      return script;
    };

    const g6Script = loadScript(
      "https://gw.alipayobjects.com/os/lib/antv/g6/4.8.17/dist/g6.min.js",
      () => setIsG6Loaded(true),
      (event) => console.error("Failed to load AntV G6 script:", event),
    );

    const toneScript = loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js",
      () => {
        /* Tone.js loaded */
      },
      (event) => console.error("Failed to load Tone.js script:", event),
    );

    return () => {
      document.head.removeChild(g6Script);
      document.head.removeChild(toneScript);
    };
  }, []);

  useEffect(() => {
    if (isG6Loaded && window.Tone && !synthRef.current) {
      window.Tone.start();
      synthRef.current =
        new window.Tone.Synth().toDestination() as ToneSynthInstance;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = null;
      }
      if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
        audioTimeoutRef.current = null;
      }
    };
  }, [isG6Loaded]);

  useEffect(() => {
    selectedItemRef.current = selectedItem;
  }, [selectedItem]);

  useEffect(() => {
    playingAudioIdRef.current = playingAudioId;
  }, [playingAudioId]);

  // playConversation function (not used for family tree, but kept from original)
  const playConversation = (callId: string, durationSeconds: number) => {
    if (!synthRef.current) {
      console.error("Tone.js synth not initialized.");
      return;
    }

    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
      audioTimeoutRef.current = null;
    }

    if (playingAudioId === callId) {
      synthRef.current.triggerRelease();
      setPlayingAudioId(null);
    } else {
      if (playingAudioId && synthRef.current) {
        synthRef.current.triggerRelease();
      }

      synthRef.current.triggerAttackRelease("C4", durationSeconds);
      setPlayingAudioId(callId);

      audioTimeoutRef.current = setTimeout(() => {
        if (synthRef.current) {
          synthRef.current.triggerRelease();
        }
        setPlayingAudioId(null);
        audioTimeoutRef.current = null;
      }, durationSeconds * 1000);
    }
  };

  interface NodeConfig {
    size: number;
    style: {
      fill: string;
      stroke: string;
      lineWidth: number;
    };
    img?: string;
    label?: string;
    labelCfg: {
      style: {
        fill: string;
        fontSize: number;
      };
      position?: string;
      autoRotate?: boolean;
    };
  }

  interface G6Group {
    addShape(type: string, attrs: any): any;
  }

  interface G6GraphInstance {
    destroy(): void;
    render(): void;
    setItemState(item: any, state: string, value: boolean): void;
    findById(id: string): any;
    on(eventName: string, handler: (evt: any) => void): void;
    node(callback: (node: G6NodeItem) => any): void; // Use G6NodeItem
    edge(callback: (edge: G6EdgeItem) => any): void; // Use G6EdgeItem
    changeSize(width: number, height: number): void;
  }

  // Define interfaces for the data structure of G6 nodes and edges
  interface G6NodeItem {
    id: string;
    label: string;
    style: {
      fill: string;
      stroke: string;
      lineWidth: number;
    };
    img?: string;
    labelCfg: {
      style: {
        fill: string;
        fontSize: number;
      };
      position?: string;
    };
    get(property: string): any; // For accessing properties like 'model' on an item
  }

  interface G6EdgeItem {
    id: string;
    source: string;
    target: string;
    type: string;
    weight: number;
    style: {
      stroke: string;
      lineWidth: number;
      endArrow?: boolean;
    };
    label?: string;
    relation?: string;
    callHistory?: CallHistoryItem[];
    get(property: string): any; // For accessing properties like 'model' on an item
    getModel(): any; // For accessing the model of the edge
  }

  useEffect(() => {
    let isMounted = true;
    // Capture containerRef.current in a variable for cleanup
    const currentContainer = containerRef.current;

    const loadGraph = async () => {
      if (
        !isG6Loaded ||
        !currentContainer || // Use the captured variable
        typeof window.G6 === "undefined"
      ) {
        return;
      }

      window.G6.registerNode(
        "circle-with-image",
        {
          draw(cfg: NodeConfig, group: G6Group) {
            const r = cfg.size / 2;
            const keyShape = group.addShape("circle", {
              attrs: {
                x: 0,
                y: 0,
                r: r,
                fill: cfg.style.fill,
                stroke: cfg.style.stroke,
                lineWidth: cfg.style.lineWidth,
              },
              name: "circle-keyShape",
              draggable: true,
            });

            if (cfg.img) {
              const imgSize = r * 1.2;
              group.addShape("image", {
                attrs: {
                  x: -imgSize / 2,
                  y: -imgSize / 2,
                  width: imgSize,
                  height: imgSize,
                  img: cfg.img,
                },
                name: "node-image",
                draggable: true,
              });
            }

            if (cfg.label) {
              group.addShape("text", {
                attrs: {
                  x: 0,
                  y: r + 10,
                  textAlign: "center",
                  textBaseline: "top",
                  text: cfg.label,
                  fill: cfg.labelCfg.style.fill,
                  fontSize: cfg.labelCfg.style.fontSize,
                },
                name: "node-label",
                draggable: true,
              });
            }
            return keyShape;
          },
          update: undefined,
        },
        "circle",
      );

      //   const data = await fetchData(); // Fetch data from JSON file
      const res = await fetch("/api/family-tree");
      const data = await res.json();

      if (!isMounted) return;

      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = null;
      }

      const Graph = window.G6.Graph;

      const newGraph = new Graph({
        // Use a temporary variable for initialization
        container: currentContainer, // Use the captured variable
        width: currentContainer.offsetWidth, // Use the captured variable
        height: currentContainer.offsetHeight, // Use the captured variable
        fitView: true,
        fitViewPadding: 20,
        // Add combo behaviors
        modes: {
          default: ["drag-canvas", "zoom-canvas", "drag-node", "drag-combo"],
        },
        layout: {
          type: "force",
          animated: true,
          linkDistance: 100,
          preventOverlap: true,
          nodeStrength: -30,
          edgeStrength: 0.1,
          // Combo layout configuration
          comboStrength: 20,
          comboPadding: 10,
        },
        defaultNode: {
          type: "circle-with-image",
          size: 40,
          style: {
            fill: "#C6E5FF",
            stroke: "#5B8FF9",
            lineWidth: 2,
          },
          labelCfg: {
            position: "bottom",
            style: {
              fill: "#000",
              fontSize: 12,
            },
          },
        },
        defaultEdge: {
          type: "line",
          style: {
            stroke: "#A3B1BF",
            lineWidth: 1,
            endArrow: true,
          },
          // Added labelCfg to make edge labels horizontal and prevent overlap
          labelCfg: {
            autoRotate: true, // This makes the label follow the edge's degree
            refY: -10, // Offset the label vertically from the edge line (negative for higher)
            style: {
              fill: "#000",
              fontSize: 10,
            },
          },
        },
        // Default combo configuration
        defaultCombo: {
          type: "circle",
          size: [60, 20], // Default width and height for combo
          labelCfg: {
            position: "top",
            style: {
              fill: "#000",
              fontSize: 12,
            },
          },
          style: {
            fill: "#BBDEFB",
            stroke: "#2196F3",
            lineWidth: 2,
            opacity: 0.8,
          },
        },
        data,
      });

      newGraph.render();
      graphRef.current = newGraph; // Assign to ref after successful creation

      newGraph.on("node:mouseenter", (evt: any) => {
        // Use any for evt as G6 event types are complex
        const node = evt.item;
        newGraph.setItemState(node, "hover", true);
      });

      newGraph.on("node:mouseleave", (evt: any) => {
        const node = evt.item;
        newGraph.setItemState(node, "hover", false);
      });

      newGraph.on("edge:mouseenter", (evt: any) => {
        const edge = evt.item;
        const currentSelectedItem = selectedItemRef.current;
        if (
          currentSelectedItem &&
          currentSelectedItem.type === "edge" &&
          edge.get("model").id === currentSelectedItem.data.id
        ) {
          return;
        }
        newGraph.setItemState(edge, "hover", true);
      });

      newGraph.on("edge:mouseleave", (evt: any) => {
        const edge = evt.item;
        const currentSelectedItem = selectedItemRef.current;
        if (
          currentSelectedItem &&
          currentSelectedItem.type === "edge" &&
          edge.get("model").id === currentSelectedItem.data.id
        ) {
          return;
        }
        newGraph.setItemState(edge, "hover", false);
      });

      newGraph.node((node: G6NodeItem) => {
        // Use G6NodeItem here
        return {
          style: {
            fill: node.style.fill || "#C6E5FF",
            stroke: node.style.stroke || "#5B8FF9",
            lineWidth: 2,
          },
          states: {
            hover: {
              stroke: "#FF9900",
              lineWidth: 3,
            },
            selected: {
              stroke: "#1890FF",
              lineWidth: 3,
            },
          },
        };
      });

      newGraph.edge((edge: G6EdgeItem) => {
        // Use G6EdgeItem here
        return {
          style: {
            stroke: "#A3B1BF",
            lineWidth: 1,
            endArrow: true,
          },
          states: {
            hover: {
              stroke: "#FF9900",
              lineWidth: 2,
            },
            selected: {
              stroke: "#1890FF",
              lineWidth: 2,
            },
          },
          // Ensure labelCfg is applied to individual edges if needed
          labelCfg: {
            autoRotate: true,
            refY: -10, // Offset the label vertically from the edge line (negative for higher)
            style: {
              fill: "#000",
              fontSize: 10,
            },
          },
        };
      });

      // Combo interactions
      newGraph.on("combo:mouseenter", (evt: any) => {
        const combo = evt.item;
        newGraph.setItemState(combo, "hover", true);
      });

      newGraph.on("combo:mouseleave", (evt: any) => {
        const combo = evt.item;
        newGraph.setItemState(combo, "hover", false);
      });

      newGraph.on("combo:click", (evt: any) => {
        const combo = evt.item;
        const model = combo.get("model");

        const currentSelectedItem = selectedItemRef.current;

        if (graphRef.current && currentSelectedItem) {
          const prevItem = graphRef.current.findById(
            currentSelectedItem.data.id,
          );
          if (prevItem) {
            graphRef.current.setItemState(prevItem, "selected", false);
          }
        }

        setSelectedItem({ type: "combo", data: model }); // Set type to combo
        newGraph.setItemState(combo, "selected", true);
        if (playingAudioIdRef.current && synthRef.current) {
          synthRef.current.triggerRelease();
          setPlayingAudioId(null);
          if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
        }
      });

      newGraph.on("node:click", (evt: any) => {
        const node = evt.item;
        const model = node.get("model");

        const currentSelectedItem = selectedItemRef.current;

        if (graphRef.current && currentSelectedItem) {
          const prevItem = graphRef.current.findById(
            currentSelectedItem.data.id,
          );
          if (prevItem) {
            graphRef.current.setItemState(prevItem, "selected", false);
          }
        }

        setSelectedItem({ type: "node", data: model });
        newGraph.setItemState(node, "selected", true);
        if (playingAudioIdRef.current && synthRef.current) {
          // Added null check for synthRef.current
          synthRef.current.triggerRelease();
          setPlayingAudioId(null);
          if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current); // Added null check
        }
      });

      newGraph.on("edge:click", (evt: any) => {
        const edge = evt.item;
        const model = edge.get("model");

        const currentSelectedItem = selectedItemRef.current;

        if (graphRef.current && currentSelectedItem) {
          const prevItem = graphRef.current.findById(
            currentSelectedItem.data.id,
          );
          if (prevItem) {
            graphRef.current.setItemState(prevItem, "selected", false);
          }
        }

        setSelectedItem({ type: "edge", data: model });
        newGraph.setItemState(edge, "selected", true);
        if (playingAudioIdRef.current && synthRef.current) {
          // Added null check for synthRef.current
          synthRef.current.triggerRelease();
          setPlayingAudioId(null);
          if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current); // Added null check
        }
      });

      newGraph.on("canvas:click", (evt: any) => {
        if (evt.item === null) {
          const currentSelectedItem = selectedItemRef.current;

          if (graphRef.current && currentSelectedItem) {
            const prevItem = graphRef.current.findById(
              currentSelectedItem.data.id,
            );
            if (prevItem) {
              graphRef.current.setItemState(prevItem, "selected", false);
            }
          }
          setSelectedItem(null);
          if (playingAudioIdRef.current && synthRef.current) {
            // Added null check for synthRef.current
            synthRef.current.triggerRelease();
            setPlayingAudioId(null);
            if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current); // Added null check
          }
        }
      });

      const handleResize = () => {
        if (graphRef.current && currentContainer) {
          // Use captured variable
          graphRef.current.changeSize(
            currentContainer.offsetWidth,
            currentContainer.offsetHeight,
          );
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };

    if (isG6Loaded) {
      loadGraph();
    }

    return () => {
      isMounted = false;
      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = null;
      }
      // Use the captured variable for cleanup
      if (currentContainer) {
        currentContainer.innerHTML = "";
      }
    };
  }, [isG6Loaded]);

  return (
    <div className="font-inter flex h-screen flex-col bg-gray-100 p-4">
      <style>{waveformCss}</style>

      <div className="mb-4 flex items-center justify-center space-x-4 rounded-lg bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold text-gray-800">
          Family Tree Visualization
        </h2>
      </div>

      <div className="flex flex-1 overflow-hidden rounded-lg bg-white shadow-lg">
        <div
          ref={containerRef}
          id="graph-container"
          className="h-full min-w-0 flex-1 rounded-l-lg"
          style={{ minHeight: "400px" }}
        />

        <div
          className={`w-80 transform border-l border-gray-200 bg-white p-6 transition-transform duration-300 ease-in-out ${selectedItem ? "translate-x-0" : "translate-x-full"} ${selectedItem ? "opacity-100" : "pointer-events-none opacity-0"} flex flex-col rounded-r-lg`}
        >
          {selectedItem ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedItem.type === "node"
                    ? "Node Details"
                    : selectedItem.type === "combo"
                      ? "Combo Details"
                      : "Relation Details"}
                </h2>
                <button
                  onClick={() => {
                    if (graphRef.current) {
                      const prevItem = graphRef.current.findById(
                        selectedItem.data.id,
                      );
                      if (prevItem) {
                        graphRef.current.setItemState(
                          prevItem,
                          "selected",
                          false,
                        );
                      }
                    }
                    setSelectedItem(null);
                    if (playingAudioId && synthRef.current) {
                      synthRef.current.triggerRelease();
                      setPlayingAudioId(null);
                      if (audioTimeoutRef.current)
                        clearTimeout(audioTimeoutRef.current);
                    }
                  }}
                  className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Close panel"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto">
                {selectedItem.type === "node" && (
                  <>
                    {selectedItem.data.img && (
                      <div className="mb-4 flex justify-center">
                        <div
                          className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2"
                          style={{
                            backgroundColor: selectedItem.data.style.fill,
                            borderColor: selectedItem.data.style.stroke,
                          }}
                        >
                          <img
                            src={selectedItem.data.img}
                            alt={selectedItem.data.label || "Icon"}
                            className="h-full w-full object-contain p-2"
                          />
                        </div>
                      </div>
                    )}

                    {selectedItem.data.fullName && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Full Name:</span>{" "}
                        {selectedItem.data.fullName}
                      </p>
                    )}
                    {selectedItem.data.icNumber && (
                      <p className="text-gray-700">
                        <span className="font-semibold">IC Number:</span>{" "}
                        {selectedItem.data.icNumber}
                      </p>
                    )}
                    {selectedItem.data.currentAddress && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Current Address:</span>{" "}
                        {selectedItem.data.currentAddress}
                      </p>
                    )}
                    {selectedItem.data.phoneNumber && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Phone Number:</span>{" "}
                        {selectedItem.data.phoneNumber}
                      </p>
                    )}
                    {selectedItem.data.birthDate && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Birth Date:</span>{" "}
                        {selectedItem.data.birthDate}
                      </p>
                    )}
                    {selectedItem.data.siblingSequence && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Sibling Sequence:</span>{" "}
                        {selectedItem.data.siblingSequence}
                      </p>
                    )}
                    {selectedItem.data.gender && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Gender:</span>{" "}
                        {selectedItem.data.gender.charAt(0).toUpperCase() +
                          selectedItem.data.gender.slice(1)}
                      </p>
                    )}
                    {selectedItem.data.comboId && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Belongs to Combo:</span>{" "}
                        {selectedItem.data.comboId}
                      </p>
                    )}
                    {selectedItem.data.assetType && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Asset Type:</span>{" "}
                        {selectedItem.data.assetType}
                      </p>
                    )}
                    {selectedItem.data.value && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Value:</span>{" "}
                        {selectedItem.data.value}
                      </p>
                    )}
                    {selectedItem.data.address && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Address:</span>{" "}
                        {selectedItem.data.address}
                      </p>
                    )}
                    {selectedItem.data.plateNumber && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Plate Number:</span>{" "}
                        {selectedItem.data.plateNumber}
                      </p>
                    )}
                    {selectedItem.data.companyName && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Company Name:</span>{" "}
                        {selectedItem.data.companyName}
                      </p>
                    )}
                    {selectedItem.data.role && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Role:</span>{" "}
                        {selectedItem.data.role}
                      </p>
                    )}
                    {selectedItem.data.startDate && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Start Date:</span>{" "}
                        {selectedItem.data.startDate}
                      </p>
                    )}
                    {selectedItem.data.endDate && (
                      <p className="text-gray-700">
                        <span className="font-semibold">End Date:</span>{" "}
                        {selectedItem.data.endDate}
                      </p>
                    )}
                    {selectedItem.data.bankName && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Bank Name:</span>{" "}
                        {selectedItem.data.bankName}
                      </p>
                    )}
                    {selectedItem.data.accountType && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Account Type:</span>{" "}
                        {selectedItem.data.accountType}
                      </p>
                    )}
                    {selectedItem.data.accountNumber && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Account Number:</span>{" "}
                        {selectedItem.data.accountNumber}
                      </p>
                    )}
                    {selectedItem.data.balance && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Balance:</span>{" "}
                        {selectedItem.data.balance}
                      </p>
                    )}
                    {selectedItem.data.creditUsed && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Credit Used:</span>{" "}
                        {selectedItem.data.creditUsed}
                      </p>
                    )}

                    {/* Filter out properties not relevant to family tree display */}
                    {Object.entries(selectedItem.data).map(([key, value]) => {
                      if (
                        [
                          "id",
                          "label",
                          "_cfg",
                          "_cache",
                          "x",
                          "y",
                          "img",
                          "style",
                          "icNumber",
                          "fullName",
                          "currentAddress",
                          "phoneNumber",
                          "description",
                          "category",
                          "status",
                          "birthDate", // Exclude as it's handled above
                          "type",
                          "size",
                          "LayoutOrder",
                          "Index",
                          "Vy",
                          "Vx",
                          "comboId", // Exclude as it's handled above
                          "siblingSequence", // Exclude as it's handled above
                          "gender", // Exclude as it's handled above
                          "assetType", // Exclude as it's handled above
                          "value", // Exclude as it's handled above
                          "companyName", // Exclude as it's handled above
                          "role", // Exclude as it's handled above
                          "startDate", // Exclude as it's handled above
                          "endDate", // Exclude as it's handled above
                          "bankName", // Exclude as it's handled above
                          "accountType", // Exclude as it's handled above
                          "accountNumber", // Exclude as it's handled above
                          "balance", // Exclude as it's handled above
                          "creditUsed", // Exclude as it's handled above
                          "address", // Exclude as it's handled above
                          "plateNumber", // Exclude as it's handled above
                        ].includes(key) ||
                        typeof value === "object"
                      ) {
                        return null;
                      }
                      return (
                        <p key={key} className="text-gray-700">
                          <span className="font-semibold capitalize">
                            {key}:
                          </span>{" "}
                          {String(value)}
                        </p>
                      );
                    })}
                  </>
                )}

                {selectedItem.type === "combo" && (
                  <>
                    {selectedItem.data.label && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Combo Name:</span>{" "}
                        {selectedItem.data.label}
                      </p>
                    )}
                    {/* You can add more combo-specific details here if needed */}
                  </>
                )}

                {selectedItem.type === "edge" && (
                  <>
                    {selectedItem.data.relation && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Relation:</span>{" "}
                        {selectedItem.data.relation}
                      </p>
                    )}
                    {selectedItem.data.label && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Label:</span>{" "}
                        {selectedItem.data.label}
                      </p>
                    )}
                    {Object.entries(selectedItem.data).map(([key, value]) => {
                      if (
                        [
                          "id",
                          "source",
                          "target",
                          "label",
                          "type",
                          "weight",
                          "_cfg",
                          "_cache",
                          "x",
                          "y",
                          "callHistory",
                          "relation",
                        ].includes(key) ||
                        typeof value === "object"
                      ) {
                        return null;
                      }
                      return (
                        <p key={key} className="text-gray-700">
                          <span className="font-semibold capitalize">
                            {key}:
                          </span>{" "}
                          {String(value)}
                        </p>
                      );
                    })}

                    {/* Call history section removed as it's not relevant to family tree */}
                  </>
                )}
              </div>
            </>
          ) : (
            <p className="mt-20 text-center text-gray-500">
              Click on a node, combo, or an edge to see its details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
