//How to Work with Different Filesystems

//Summary:

//1. Don't Guess Filesystem Behavior from process.platform

    // Common Mistake: Assuming Linux always supports POSIX permissions/inodes, or assuming macOS (darwin) is always case-insensitive.

    // Reality: Users often mount external drives (e.g., FAT32 or exFAT USB drives) or configure case-sensitive partitions (like HFSX/APFS).

    // Best Practice: Probe the filesystem directly by testing behavior rather than assuming rules based strictly on the OS name.

//2. Avoid the "Lowest Common Denominator" Approach

    // The Trap: Attempting cross-platform compatibility by stripping features down to the dumbest filesystem (e.g., forcing all filenames to uppercase, truncating timestamps to whole seconds).

    // The Consequence: You break compatibility with modern filesystems, causing filename collisions (e.g., overwriting File.txt with file.txt) and breaking tools that depend on fine-grained timestamps (like caches and build systems).

//3. Adopt the "Superset" Approach

    // The Solution: Design your program internally to maintain the highest possible fidelity (preserve exact casing, raw byte sequences, full millisecond/nanosecond timestamps, and platform-specific metadata like Windows btime and Linux chmod permissions).

    // Downsample Only When Needed: Because your application holds rich metadata, you can downgrade/adapt when writing to a less-capable filesystem—something you cannot do if you stripped that data early on.

//4. Unicode Forms: Preservation vs. Insensitivity

    // The Problem: The same character (like é) can be represented as a single code point (NFC / composed) or two code points (NFD / decomposed). Older macOS HFS+ normalizes filenames to NFD, whereas Linux and Windows preserve whatever bytes were given.

    // The Rule:

    // Preservation: Never mutate or force-rename filenames to a specific Unicode form on disk.

    // Insensitivity: Normalize only during comparisons in memory using JavaScript’s built-in string.normalize('NFC'):

    //const match = str1.normalize('NFC') === str2.normalize('NFC');

//5. Timestamp Resolution & Data Integrity

    // Filesystems have varying time resolutions (FAT can be as coarse as 2 seconds or 24 hours; NTFS/EXT4 support nanoseconds/milliseconds).

    // When fs.stat() returns a rounded timestamp, it is the filesystem's limitation, not a Node.js bug.

    // Filenames and timestamps are user data: Treat normalization as a lossy comparison hash, never as a transformation to permanently write back to disk.

//Note:

    // Store and pass on exact bytes and casing (Preservation); normalize only in memory when comparing or searching (Insensitivity).