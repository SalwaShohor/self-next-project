"use client";

import { useEffect, useRef, useState } from "react";

// Declare global interface for Tone.js and G6 to resolve TypeScript errors
declare global {
  interface Window {
    Tone: any; // Tone.js library
    G6: any; // G6 graph library
  }
}

// CSS for waveform animation
const waveformCss = `
  @keyframes waveform {
    0% { height: 25%; }
    25% { height: 75%; }
    50% { height: 50%; }
    75% { height: 100%; }
    100% { height: 25%; }
  }
  .animate-waveform {
    animation: waveform 1.5s ease-in-out infinite alternate;
  }
`;

// Function to generate a random date and time within a specified range or last year
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

// Function to format time as HH:MM
const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

// Define a type for a single call history item
interface CallHistoryItem {
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  durationSeconds: number;
  audioId: string;
}

// Function to generate dummy call history
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

// Function to summarize call history as total calls and date range
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

// Custom SVG for Muthu (placeholder as direct access to Google Drive is not possible)
const muthuSvgDataUrl = "/images/profile-image/muthu.svg"; // Updated to use the image URL

// Custom SVG for Tan Ah Kow (placeholder as direct access to Google Drive is not possible)
const tanAhKowSvgDataUrl = "/images/profile-image/tan-ah-kow.svg"; // Updated to use the image URL

// Generic Profile Icon SVG
const genericProfileSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#95a5a6">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
`;
const genericProfileSvgDataUrl = `data:image/svg+xml;base64,${btoa(genericProfileSvg)}`;

// Car Icon SVG
const carSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c">
    <path d="M18.92 2.01c-.08-.02-.16-.02-.24 0l-1.92.48c-.2.05-.36.19-.45.39-.09.2-.09.44 0 .64l.96 1.92c.09.2.25.34.45.39.2.05.4.03.58-.06l1.92-.48c.08-.02.16-.02.24 0l1.92-.48c.2-.05.36-.19.45-.39.09-.2.09-.44 0-.64l-.96-1.92c-.09-.2-.25-.34-.45-.39-.2-.05-.4-.03-.58.06L18.92 2.01zM12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9zm0 2c3.87 0 7 3.13 7 7v4H5v-4c0-3.87 3.13-7 7-7zm-4 12c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm8 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
  </svg>
`;
const carSvgDataUrl = `data:image/svg+xml;base64,${btoa(carSvg)}`;

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
}

interface PersonNode extends BaseNode {
  icNumber?: string;
  fullName?: string;
  currentAddress?: string;
  phoneNumber?: string;
}

interface CarNode extends BaseNode {
  carName?: string;
  ownerBuyDate?: string;
  carReleaseDate?: string;
  engineCapacity?: string;
}

type NodeType = PersonNode | CarNode;

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

// Function to generate random IC number
const generateICNumber = () => {
  const year = Math.floor(Math.random() * (99 - 50 + 1)) + 50; // 50-99
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
  const stateCode = String(Math.floor(Math.random() * 16) + 1).padStart(2, "0"); // 01-16
  const lastDigits = String(Math.random() * 10000).padStart(4, "0");
  return `${year}${month}${day}-${stateCode}-${lastDigits}`;
};

// Function to generate random phone number
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
  const suffix = String(Math.random() * 10000000).padStart(7, "0");
  return `${randomPrefix}-${suffix}`;
};

// Function to generate random address
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

// Function to generate random date for car details (e.g., within last 10 years)
const generateRandomCarDate = () => {
  const now = new Date();
  const past = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
  const randomTimestamp =
    past.getTime() + Math.random() * (now.getTime() - past.getTime());
  const randomDate = new Date(randomTimestamp);
  return randomDate.toLocaleDateString("en-GB");
};

// Function to generate random engine capacity
const generateEngineCapacity = () => {
  const capacities = ["1.5L", "1.8L", "2.0L", "2.5L", "3.0L"];
  return capacities[Math.floor(Math.random() * capacities.length)];
};

// Function to fetch graph data, simulating an API call
const fetchData = async () => {
  // Small graph data
  const nodes: NodeType[] = [
    // Explicitly type the nodes array
    { id: "node-A", label: "Muthu", description: "This is Muthu's node." },
    { id: "node-B", label: "Tan Ah Kow", category: "Group 1" },
    { id: "node-C", label: "Aisha", status: "Active" },
    { id: "node-D", label: "Wei Ling", category: "Group 2" },
    {
      id: "node-E",
      label: "David Lee",
      description: "Another important person.",
    },
    { id: "node-F", label: "Priya Sharma", status: "Inactive" },
    // New node for car, updated label and added car-specific properties
    {
      id: "node-Car",
      label: "VD 1234",
      description: "This is an asset node.", // Updated description
      carName: "Honda Civic", // Added car name
      img: carSvgDataUrl,
      style: { fill: "#F08080", stroke: "#5B8FF9", lineWidth: 2 },
      ownerBuyDate: generateRandomCarDate(),
      carReleaseDate: generateRandomCarDate(),
      engineCapacity: generateEngineCapacity(),
    },
  ];

  // Assign specific SVGs for Muthu and Tan Ah Kow, generic for others, and add contact info
  nodes.forEach((node: NodeType) => {
    // Explicitly type node here
    if (node.id === "node-A") {
      // Muthu
      node.img = muthuSvgDataUrl;
      node.style = { fill: "#ADD8E6", stroke: "#5B8FF9", lineWidth: 2 }; // Light blue for Muthu's circle
      // Type assertion to tell TypeScript this is a PersonNode
      const personNode = node as PersonNode;
      personNode.icNumber = "780101-14-5678";
      personNode.fullName = "Muthu s/o Karuppan";
      personNode.currentAddress = "123, Jalan Kenanga, 50000 Kuala Lumpur";
      personNode.phoneNumber = "012-3456789";
    } else if (node.id === "node-B") {
      // Tan Ah Kow
      node.img = tanAhKowSvgDataUrl; // Updated to new URL
      node.style = { fill: "#90EE90", stroke: "#5B8FF9", lineWidth: 2 }; // Light green for Tan Ah Kow's circle
      // Type assertion to tell TypeScript this is a PersonNode
      const personNode = node as PersonNode;
      personNode.icNumber = "850505-07-1234";
      personNode.fullName = "Tan Ah Kow";
      personNode.currentAddress = "45, Lorong Meranti, 46000 Petaling Jaya";
      personNode.phoneNumber = "016-9876543";
    } else if (node.id === "node-C") {
      // Aisha
      node.img = "/images/profile-image/aisyah.svg"; // Updated to new URL
      node.style = { fill: getRandomColor(), stroke: "#5B8FF9", lineWidth: 2 }; // Keep random color for Aisha if desired, or set a specific one
      const personNode = node as PersonNode;
      personNode.icNumber = generateICNumber();
      personNode.fullName = node.label;
      personNode.currentAddress = generateAddress();
      personNode.phoneNumber = generatePhoneNumber();
    } else if (node.id === "node-D") {
      // Wei Ling
      node.img = "/images/profile-image/wei-ling.svg"; // New URL for Wei Ling
      node.style = { fill: getRandomColor(), stroke: "#5B8FF9", lineWidth: 2 };
      const personNode = node as PersonNode;
      personNode.icNumber = generateICNumber();
      personNode.fullName = node.label;
      personNode.currentAddress = generateAddress();
      personNode.phoneNumber = generatePhoneNumber();
    } else if (node.id === "node-E") {
      // David Lee
      node.img = "/images/profile-image/david-lee.svg"; // New URL for David Lee
      node.style = { fill: getRandomColor(), stroke: "#5B8FF9", lineWidth: 2 };
      const personNode = node as PersonNode;
      personNode.icNumber = generateICNumber();
      personNode.fullName = node.label;
      personNode.currentAddress = generateAddress();
      personNode.phoneNumber = generatePhoneNumber();
    } else if (node.id === "node-F") {
      // Priya Sharma
      node.img = "/images/profile-image/priya-sharma.svg"; // New URL for Priya Sharma
      node.style = { fill: getRandomColor(), stroke: "#5B8FF9", lineWidth: 2 };
      const personNode = node as PersonNode;
      personNode.icNumber = generateICNumber();
      personNode.fullName = node.label;
      personNode.currentAddress = generateAddress();
      personNode.phoneNumber = generatePhoneNumber();
    } else if (node.id !== "node-Car") {
      // Apply generic to others, but not the car node which has its own icon
      node.img = genericProfileSvgDataUrl;
      node.style = { fill: getRandomColor(), stroke: "#5B8FF9", lineWidth: 2 };
      // Type assertion to tell TypeScript this is a PersonNode
      const personNode = node as PersonNode;
      personNode.icNumber = generateICNumber();
      personNode.fullName = node.label; // Use label as full name for generic nodes
      personNode.currentAddress = generateAddress();
      personNode.phoneNumber = generatePhoneNumber();
    }
    // Car node does not get these properties
  });

  return {
    nodes: nodes,
    edges: [
      // Edge between Muthu (node-A) and Tan Ah Kow (node-B) made thicker
      {
        source: "node-A",
        target: "node-B",
        type: "directed",
        weight: 20,
        style: { lineWidth: 4, stroke: "#5B8FF9" },
        // Specific call history for Muthu and Tan Ah Kow
        callHistory: generateCallHistory(
          15,
          "2024-11-01T00:00:00",
          "2024-11-30T23:59:59",
        ),
        relation: "friends", // Added relation property
      },
      {
        source: "node-A",
        target: "node-C",
        type: "undirected",
        weight: 5,
        relation: "colleagues",
        callHistory: generateCallHistory(Math.floor(Math.random() * 2) + 1),
      },
      {
        source: "node-B",
        target: "node-D",
        type: "directed",
        relation: "parent-child",
        callHistory: generateCallHistory(Math.floor(Math.random() * 2) + 1),
      },
      {
        source: "node-C",
        target: "node-E",
        labelCfg: { autoRotate: true },
        relation: "peer",
        callHistory: generateCallHistory(Math.floor(Math.random() * 2) + 1),
      },
      {
        source: "node-D",
        target: "node-F",
        relation: "dependency",
        callHistory: generateCallHistory(Math.floor(Math.random() * 2) + 1),
      },
      {
        source: "node-E",
        target: "node-F",
        relation: "connection",
        callHistory: generateCallHistory(Math.floor(Math.random() * 2) + 1),
      },
      {
        source: "node-B",
        target: "node-Car",
        type: "undirected",
        label: "owns a car",
        relation: "ownership",
      },
    ],
  };
};

export default function Page() {
  const graphRef = useRef<G6GraphInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // Explicitly type containerRef
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const selectedItemRef = useRef<any | null>(null);
  const [graphType, setGraphType] = useState("small");
  const [isG6Loaded, setIsG6Loaded] = useState(false);

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

  const playConversation = (callId: string, durationSeconds: number) => {
    if (!synthRef.current) {
      console.error("Tone.js synth not initialized.");
      return;
    }

    if (audioTimeoutRef.current) {
      // Only clear if it's not null
      clearTimeout(audioTimeoutRef.current);
      audioTimeoutRef.current = null;
    }

    if (playingAudioId === callId) {
      synthRef.current.triggerRelease();
      setPlayingAudioId(null);
    } else {
      if (playingAudioId && synthRef.current) {
        // Ensure synthRef.current is not null here
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

    const loadGraph = async () => {
      if (
        !isG6Loaded ||
        !containerRef.current ||
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

      const data = await fetchData();

      if (!isMounted) return;

      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = null;
      }

      const Graph = window.G6.Graph;

      const newGraph = new Graph({
        // Use a temporary variable for initialization
        container: containerRef.current,
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        fitView: true,
        fitViewPadding: 20,
        behaviors: ["drag-canvas", "zoom-canvas", "drag-node"],
        layout: {
          type: "force",
          animated: true,
          linkDistance: 100,
          preventOverlap: true,
          nodeStrength: -30,
          edgeStrength: 0.1,
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
        },
        modes: {
          default: ["drag-canvas", "zoom-canvas", "drag-node"],
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
        };
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
        if (graphRef.current && containerRef.current) {
          // Use graphRef.current and containerRef.current
          graphRef.current.changeSize(
            containerRef.current.offsetWidth,
            containerRef.current.offsetHeight,
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
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [isG6Loaded]);

  return (
    <div className="font-inter flex h-screen flex-col bg-gray-100 p-4">
      <style>{waveformCss}</style>

      <div className="mb-4 flex items-center justify-center space-x-4 rounded-lg bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Graph Visualization</h2>
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
                      // Added null check for synthRef.current
                      synthRef.current.triggerRelease();
                      setPlayingAudioId(null);
                      if (audioTimeoutRef.current)
                        clearTimeout(audioTimeoutRef.current); // Added null check
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

                    {selectedItem.data.id !== "node-Car" && (
                      <>
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
                            <span className="font-semibold">
                              Current Address:
                            </span>{" "}
                            {selectedItem.data.currentAddress}
                          </p>
                        )}
                        {selectedItem.data.phoneNumber && (
                          <p className="text-gray-700">
                            <span className="font-semibold">Phone Number:</span>{" "}
                            {selectedItem.data.phoneNumber}
                          </p>
                        )}
                      </>
                    )}

                    {selectedItem.data.id === "node-Car" && (
                      <>
                        {selectedItem.data.label && (
                          <p className="text-gray-700">
                            <span className="font-semibold">Plate Number:</span>{" "}
                            {selectedItem.data.label}
                          </p>
                        )}
                        {selectedItem.data.carName && (
                          <p className="text-gray-700">
                            <span className="font-semibold">Car Name:</span>{" "}
                            {selectedItem.data.carName}
                          </p>
                        )}
                        {selectedItem.data.ownerBuyDate && (
                          <p className="text-gray-700">
                            <span className="font-semibold">
                              Owner Buy Date:
                            </span>{" "}
                            {selectedItem.data.ownerBuyDate}
                          </p>
                        )}
                        {selectedItem.data.carReleaseDate && (
                          <p className="text-gray-700">
                            <span className="font-semibold">
                              Car Release Date:
                            </span>{" "}
                            {selectedItem.data.carReleaseDate}
                          </p>
                        )}
                        {selectedItem.data.engineCapacity && (
                          <p className="text-gray-700">
                            <span className="font-semibold">
                              Engine Capacity:
                            </span>{" "}
                            {selectedItem.data.engineCapacity}
                          </p>
                        )}
                        {selectedItem.data.description && (
                          <p className="text-gray-700">
                            <span className="font-semibold">Description:</span>{" "}
                            {selectedItem.data.description}
                          </p>
                        )}
                      </>
                    )}

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
                          "ownerBuyDate",
                          "carReleaseDate",
                          "engineCapacity",
                          "type",
                          "size",
                          "LayoutOrder",
                          "Index",
                          "Vy",
                          "Vx",
                          "carName",
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

                    {selectedItem.data.callHistory &&
                      selectedItem.data.callHistory.length > 0 && (
                        <div className="mt-4 border-t border-gray-200 pt-4">
                          <h3 className="mb-2 text-lg font-semibold text-gray-800">
                            Call History
                          </h3>
                          <div className="mb-3 rounded-md bg-blue-50 p-2 text-sm">
                            <p className="font-medium text-blue-700">
                              {summarizeCallHistory(
                                selectedItem.data.callHistory,
                              )}
                            </p>
                          </div>
                          <div className="max-h-40 overflow-y-auto pr-2">
                            {selectedItem.data.callHistory.map(
                              (
                                call: CallHistoryItem,
                                index: number, // Explicitly type call and index
                              ) => (
                                <div
                                  key={index}
                                  className="mb-2 flex flex-col rounded-md bg-gray-50 p-2 text-sm"
                                >
                                  <div className="flex-grow">
                                    <p>
                                      <span className="font-medium">Date:</span>{" "}
                                      {call.date}
                                    </p>
                                    <p>
                                      <span className="font-medium">Time:</span>{" "}
                                      {call.startTime} - {call.endTime}
                                    </p>
                                    <p>
                                      <span className="font-medium">
                                        Duration:
                                      </span>{" "}
                                      {call.duration}
                                    </p>
                                  </div>
                                  <div className="mt-2 flex items-center space-x-2">
                                    <button
                                      onClick={() =>
                                        playConversation(
                                          call.audioId,
                                          call.durationSeconds,
                                        )
                                      }
                                      className={`rounded-full p-2 ${playingAudioId === call.audioId ? "bg-blue-200 text-blue-800" : "bg-gray-200 text-gray-700"} transition-colors duration-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                      aria-label={
                                        playingAudioId === call.audioId
                                          ? "Pause conversation"
                                          : "Play conversation"
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                        <line x1="12" y1="19" x2="12" y2="22" />
                                      </svg>
                                    </button>
                                    <div className="flex h-8 items-end overflow-hidden">
                                      {Array.from({ length: 10 }).map(
                                        (_, i) => (
                                          <div
                                            key={i}
                                            className={`mx-px w-1 rounded-full bg-blue-500 transition-all duration-100 ease-in-out ${playingAudioId === call.audioId ? "animate-waveform" : ""} `}
                                            style={{
                                              height:
                                                playingAudioId === call.audioId
                                                  ? `${(Math.sin(i * 0.8 + Date.now() * 0.005) * 0.5 + 0.5) * 80 + 20}%`
                                                  : `${Math.floor(Math.random() * 60) + 20}%`,
                                            }}
                                          ></div>
                                        ),
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                    {selectedItem.data.source === "node-A" &&
                      selectedItem.data.target === "node-B" && (
                        <div className="mt-4 border-t border-gray-200 pt-4">
                          <h3 className="mb-2 text-lg font-semibold text-gray-800">
                            Summary of the conversation
                          </h3>
                          <p className="text-gray-700">
                            <span className="font-semibold">
                              Most repeated word:
                            </span>{" "}
                            "package", "drop", "the guy", "green", "midnight",
                            "usual place", "done", "watch out"
                          </p>
                        </div>
                      )}
                  </>
                )}
              </div>
            </>
          ) : (
            <p className="mt-20 text-center text-gray-500">
              Click on a node or an edge to see its details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
