
export function retriveNoteHtml(gateName) {
  if (gateName){
    return 'Hint: unselect this gate in the gates pallete to see here useful general hints for using the Circuit Editor.';
  } else {
    return 'Hint: select any gate in the gates pallete to see here the documentation for that gate.'
  }
}

export function retriveSimpleGateHelpHtml(gateName) {

    if (gateName == "u3") {
        return 'This is a generic, three parametric, unitary single bit gate. It can be expressed in termed of elementary rotations as around X, Y and Z axes as: U3(θ, φ, λ) = Rz(φ)&nbsp;Ry(θ)&nbsp;Rz(λ). The range for θ, φ and λ is [0, 4π).';
    } else if (gateName == "u2") {
        return 'This is a generic, two parametric, unitary single bit gate and is defined as: u3(π/2, φ, λ). It can be expressed in termed of elementary rotations as around X, Y and Z axes as: U2(φ, λ) = Rz(φ)&nbsp;Ry(π/2)&nbsp;Rz(λ).  The range for θ and φ is [0, 4π).';
    } else if (gateName == "u1") {
        return 'This is a generic, one parameter, unitary single bit gate and is defined as: u3(0, 0, λ). The "u1" gate acts on a single qubit. Leaves the basis state |0⟩ unchanged and map |1⟩ to exp(i*λ)|1⟩. The probability of measuring a |0⟩ or |1⟩ is unchanged after applying this gate, however it modifies the phase of the quantum state. The z, s and t gates are special cases of "u1" for λ values given by π, π/2 and π/4 respectively.  The range for λ is [0, 4π).'
    } else if (gateName == "hadamard") {
        return 'The "hadamard" gate acts on a single qubit and is defined as: u2(0, π). This gate creates a superposition by mapping |0⟩ to |+⟩ and |1⟩ to |-⟩. It is the combination of two rotations, first a π rotation about the Z-axis of the Bloch sphere followed by a π/2 about the Y-axis. Alternatively, it can be represented as a π rotation around an axis diagonal in the Z-X plane. The Hadamard gate is the one-qubit version of the quantum Fourier transform.';
    } else if (gateName == "aggregate") {
        return 'The "aggregate" gate permits grouping multiple single qubit target gates in a single multiple targets gate that may share the same set of controls. This way more compact circuits can be created. As for any other gate, when the Shift key is pressed during drag & drop, the aggregate gate is copied instead of being moved at the drop location. When instead the Alt key is pressed, and the line of movement is horizontal, an array of identical copies is created.';
    }  else if (gateName == "identity") {
      return 'The "identity" gate acts on a single qubit and preserves current state of the qubit it is applied to.';
    }  else if (gateName == "p") {
      return 'This is the phase shift gate, it shifts the phase of the |1⟩ state relative to the |0⟩ state. It leaves the basis state |0⟩ unchanged and map |1⟩ to exp(i*θ)|1⟩. The range for θ is [0, 4π). It is identical to "u1" gate (except for the name of free parameter) and it was added only because it might be considered more expressive in certain contexts. Should not be confused with the "s" gate which historically was sometimes named "p".'
    }   else if (gateName == "pauli-x") {
        return 'The "pauli-x" gate acts on a single qubit and is defined as: u3(π, 0, π). With respect to the computational basis it is the quantum equivalent of the NOT gate for classical computers since it maps |0⟩ to |1⟩ and |1⟩ to |0⟩. It is equivalent to a rotation around the X-axis of the Bloch sphere by π radians.';
    } else if (gateName == "pauli-y") {
        return 'The "pauli-y" gate acts on a single qubit and is defined as: u3(π, π/2, π/2). It is equivalent to a rotation around the Y-axis of the Bloch sphere by π radians.';
    } else if (gateName == "pauli-z") {
        return 'The "pauli-z" gate acts on a single qubit and is defined as: u1(π). It is equivalent to a rotation around the Z-axis of the Bloch sphere by π radians. It is a special case of a phase shift gate "u1" with λ equal to π. It leaves the basis state |0⟩ unchanged and maps |1⟩ to −|1⟩. From a different perspective it flips the |+⟩ and |-⟩ basis states, performing in the |+/-⟩ basis states the same role as "pauli-x" gate in the standard basis.';
    } else if (gateName == "qft") {
      return "This gate implements the Quantum Fourier Transform. This happens to be unitary operation which can be efficiently implemented using O(n<sup>2</sup>) one and two qubit gates."
    } else if (gateName == "qft-dagger") {
      return "This gate implements the inverse of Quantum Fourier Transform. This happens to be a unitary operation which can be efficiently implemented using O(n<sup>2</sup>) one and two qubit gates."
    } else if (gateName == "t") {
        return 'The "t" gate acts on a single qubit and is defined as: u1(π/4). It represents an anti-clockwise π/4 radians rotation around the Z-axis of the Bloch sphere up to a global phase factor. Leaves the basis state |0⟩ unchanged and map |1⟩ to exp(i*π/4)|1⟩. The probability of measuring a |0⟩ or |1⟩ is unchanged after applying this gate, however it modifies the phase of the quantum state. The "t" gate is related to "s" gate by the relation: s = t * t. The "t" gate is a special cases of "u1" for λ equal to π/4. This gate is an example of a non-Clifford gate.';
    } else if (gateName == "t-dagger") {
        return 'The "t-dagger" gate acts on a single qubit and is defined as: u1(-π/4). It is the conjugate transpose of "t" gate. It represents a clockwise π/4 radians rotation around the Z-axis of the Bloch sphere up to a global phase factor. Leaves the basis state |0⟩ unchanged and map |1⟩ to exp(-i*π/4) |1⟩. The probability of measuring a |0⟩ or |1⟩ is unchanged after applying this gate, however it modifies the phase of the quantum state. This gate is an example of a non-Clifford gate.';
    } else if (gateName == "rx-theta") {
        return 'The "rx-theta" gate acts on a single qubit and is defined as: u3(θ, -π/2, π/2). It is an anti-clockwise rotation through angle θ radians around the X-axis of the Bloch sphere and can be expressed in terms of X Pauli operator as: exp(-i * θ/2 * X). The range for θ is [0, 4π).';
    } else if (gateName == "ry-theta") {
        return 'The "ry-theta" gate acts on a single qubit and is defined as: u3(θ, 0, 0). It is an anti-clockwise rotation through angle θ radians around the Y-axis of the Bloch sphere and can be expressed in terms of Y Pauli operator as: exp(-i * θ/2 *Y). The range for θ is [0, 4π).';
    } else if (gateName == "rz-theta") {
        return 'The "rz-theta" gate acts on a single qubit and is different from u1(θ) by a global phase given by exp(-iθ/2). It is an anti-clockwise rotation through angle θ radians around the Z-axis of the Bloch sphere  and can be expressed in terms of Z Pauli operator as: exp(-i * θ/2 * Z). The range for θ is [0, 4π).';
    } else if (gateName == "s") {
        return 'The "s" gate acts on a single qubit and is defined as: u1(π/2). It represents an anti-clockwise π/2 radians rotation around the Z-axis of the Bloch sphere. The "s" gate is related to the "t" gate by the relationship s = t * t. It is also the square root of pauli-z gate. The "s" gate is a special cases of "u1" for λ equal to π/2.';
    } else if (gateName == "s-dagger") {
        return 'The "s-dagger" gate acts on a single qubit and is defined as: u1(-π/2). It is the conjugate transpose of s gate. It represents a clockwise π/2 radians rotation around the Z-axis of the Bloch sphere.';
    } else if (gateName == "swap") {
        return 'This gate swaps two qubits and when expressed as a canonical gate is equal to Canonical(1/2, 1/2, 1/2).';
    } else if (gateName == "sqrt-swap") {
        return 'This gate performs half-way a two-qubit swap.  It the square root of swap gate and when expressed as a canonical gate is equal to Canonical(1/4, 1/4, 1/4).';
    } else if (gateName == "swap-theta") {
        return 'This gate performs partial a two-qubit swap and is equivalent to Canonical(1/2, 1/2, 1/2 - θ/π). Equivalence between two gates means they have the same unitary operator up to a global phase factor. The range for θ is [0, 4π).';
    } else if (gateName == "iswap") {
        return 'This gate performs partial a two-qubit swap and is equivalent to Canonical(-1/2, -1/2, 0). Equivalence between two gates means they have the same unitary operator up to a global phase factor.';
    } else if (gateName == "measure-x") {
        return 'Measures a qubit along the direction given by the X-axis of the Bloch sphere. This is not a unitary operation. The index of the classic bit where a qubit is measured cannot be larger than the maximum qubit index. \
When multiple qubits are measured in the same classical bit . When no measure gates are present in the circuit simulation results are identical to the situation where \
each qubit is measured into a classical bit with index equal to the qubit index of the measure gate.';
    } else if (gateName == "measure-y") {
        return 'Measures a qubit along the direction given by the Y-axis of the Bloch sphere. This is not a unitary operation. The index of the classic bit where a qubit is measured cannot be larger than the maximum qubit index. \
When multiple qubits are measured in the same classical bit the result is given by addition modulo 2 of each measurement result. When no measure gates are present in the circuit simulation results are identical to the situation where \
each qubit is measured into a classical bit with index equal to the qubit index of the measure gate.';
    } else if (gateName == "measure-z") {
        return 'Measures a qubit along the direction given by the Z-axis of the Bloch sphere. This is not a unitary operation. The index of the classic bit where a qubit is measured cannot be larger than the maximum qubit index. \
When multiple qubits are measured in the same classical bit the result is given by addition modulo 2 of each measurement result. When no measure gates are present in the circuit simulation results are identical to the situation where \
each qubit is measured into a classical bit with index equal to the qubit index of the measure gate.';
    } else if (gateName == "xx") {
        return 'XX Ising gate is a native gate for laser driven trapped ions devices and it is defined as: exp(-i * θ/2 * X⊗X). The range for θ is [0, 4π). When expressed in terms of  canonical gate it is equal to Canonical(θ, 0, 0). The Ising XX, YY and ZZ gates all commute with one another.';
    } else if (gateName == "yy") {
        return 'YY Ising gate is a native gate for laser driven trapped ions devices and it is defined as: exp(-i * θ/2 * Y⊗Y). The range for θ is [0, 4π). When expressed in terms of  canonical gate it is equal to Canonical(0, θ, 0). The Ising XX, YY and ZZ gates all commute with one another.';
    } else if (gateName == "zz") {
        return 'ZZ Ising gate is a native gate for laser driven trapped ions devices and it is defined as: exp(-i * θ/2 * Z⊗Z). The range for θ is [0, 4π). When expressed in terms of  canonical gate it is equal to Canonical(0, 0, θ). The Ising XX, YY and ZZ gates all commute with one another.';
    } else if (gateName == "pauli-x-root") {
        return 'The "pauli-x-root" gate is the root of a "pauli-x" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as an anti-clockwise rotation around X-axis of Bloch sphere with an angle given by π/t or, depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-y-root") {
        return 'The "pauli-y-root" gate is the root of a "pauli-y" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as an anti-clockwise rotation around Y-axis of Bloch sphere with an angle given by π/t or, depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-z-root") {
        return 'The "pauli-z-root" gate is the root of a "pauli-z" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as an anti-clockwise rotation around Z-axis of Bloch sphere with an angle given by π/t or depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-x-root-dagger") {
        return 'The "pauli-x-root-dagger" gate is the transpose conjugate of "pauli-x-root" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a clockwise rotation around X-axis of Bloch sphere with an angle given by π/t or, depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-y-root-dagger") {
        return 'The "pauli-y-root-dagger" gate is the transpose conjugate of "pauli-y-root" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a clockwise rotation around Y-axis of Bloch sphere with an angle given by π/t or, depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-z-root-dagger") {
        return 'The "pauli-z-root-dagger" gate is the transpose conjugate of "pauli-z-root" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a clockwise rotation around Z-axis of Bloch sphere with an angle given by π/t or depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "v") {
      return 'This is the square root of the "pauli-x" gate: v * v = pauli-x. It represents an anti-clockwise π/2 radians rotation around the X-axis.';
    } else if (gateName == "v-dagger") {
      return 'As conjugate transpose of "v", this is the inverse square root of the "pauli-x" gate. It represents a clockwise π/2 radians rotation around the X-axis.';
    } else if (gateName == "h") {
      return 'This is the square root of the "pauli-y" gate. It represents an anti-clockwise π/2 radians rotation around the Y-axis. It is also called pseudo-Hadamard gate since it transforms computational basis states to X basis states and back.';
    }  else if (gateName == "h-dagger") {
      return 'As conjugate transpose of "h" this is the inverse square root of the "pauli-y" gate. It represents a clockwise π/2 radians rotation around the Y-axis. It transforms computational basis states to X basis states and back.';
    } else if (gateName == "hadamard-xy") {
      return 'The standard "hadamard" gate can be represented as a π rotation around an axis diagonal in the Z-X plane. This gate represented as a π rotation around an axis diagonal in the X-Y plane. It translates up to a phase the X basis elements (|+⟩ and |-⟩) to the Y basis elements (|+i⟩ and |-i⟩) and back and is given by the following formula: hadamard-xy = v * hadamard * v-dagger. ';
    } else if (gateName == "hadamard-yz") {
      return 'The standard "hadamard" gate can be represented as a π rotation around an axis diagonal in the Z-X plane. This gate represented as a π rotation around an axis diagonal in the Y-Z plane.  It translates up to a phase the Z basis elements (|0⟩ and |1⟩) to the Y basis elements (|+i⟩ and |-i⟩) and back and is given by the following formula: hadamard-yz = s * hadamard * s-dagger. ';
    }  else if (gateName == "hadamard-zx") {
      return 'The standard "hadamard" gate can be represented as a π rotation around an axis diagonal in the Z-X plane. This gate is an alias for standard "hadamard" gate. It takes the computational Z-basis (|0⟩ and |1⟩) to the X-basis (|+⟩ and |-⟩) and back.';
    } else if (gateName == "c") {
      return 'This gate permutes the three axes of the Bloch sphere (X->Y, Y->Z, Z->X). It represents a 120 degree rotation of the Bloch sphere.';
    } else if (gateName == "c-dagger") {
      return 'This is the conjugate transpose of "c" gate and is also equal to the square of the "c" gate. It permutes the three axes of the Bloch sphere (X->Z, Y->X, Z->Y).';
    } else if (gateName == "fswap") {
      return 'This is the fermionic swap gate which swaps adjacent fermionic modes in the Jordan-Wigner representation and is equivalent to Canonical(1/2, 1/2, 0). Equivalence between two gates means they have the same unitary operator up to a global phase factor.';
    } else if (gateName == "swap-root") {
      return 'This represents a parametrized root of "swap" gate and when expressed as a canonical gate is equal to Canonical(1/(2t), 1/(2t), 1/(2t)).';
    } else if (gateName == "swap-root-dagger") {
      return 'This is the conjugate transpose of "swap-root" gate.';
    }else if (gateName == "sqrt-swap-dagger") {
      return 'This is the conjugate transpose of "sqrt-swap" gate and when expressed as a canonical gate is equal to Canonical(3/4, 1/4, 1/4).';
    } else if (gateName == "molmer-sorensen") {
      return 'The Mølmer-Sørensen gate is a natural gate for laser driven trapped ions and when expressed as a canonical gate is equal to Canonical(−1/2, 0, 0).';
    } else if (gateName == "molmer-sorensen-dagger") {
      return 'This is the conjugate transpose of Mølmer-Sørensen gate. Ir is a natural gate for laser driven trapped ions and when expressed as a canonical gate is equal to Canonical(1/2, 0, 0).';
    } else if (gateName == "xy") {
      return 'This is the "xy" gate and it is defined as: exp(-i * θ/2 * (X⊗X + Y⊗Y)). When expressed in terms of  canonical gate it is equal to Canonical(θ, θ, 0). The range for θ is [0, 4π).';
    } else if (gateName == "a") {
      return 'The "a" gate conserves the number of 1s versus 0s in the computational basis and is used in the VQE ansatz. The range for θ and φ is [0, 4π).'
    } else if (gateName == "berkeley") {
      return 'This is the Berkeley gate. When expressed in terms of canonical gate it is equal to Canonical(−1/2, −1/4, 0).';
    } else if (gateName == "berkeley-dagger") {
      return 'This is the conjugate transpose of Berkeley gate.';
    } else if (gateName == "w") {
      return 'The "w" gate is an orthogonal and hermitian gate and can be used to diagonalize the "swap" gate.';
    } else if (gateName == "ecp") {
      return 'The "ecp" gate and is equivalent to Canonical(1/2, 1/4, 1/4). Equivalence between two gates means they have the same unitary operator up to a global phase factor.';
    } else if (gateName == "ecp-dagger") {
      return 'This is the conjugate transpose of "ecp" gate.';
    } else if (gateName == "magic") {
      return 'The magic gate trasforms computational based to the magic basis and is equivalent to Canonical(1/2, 0, 0). Equivalence between two gates means they have the same unitary operator up to a global phase factor.';
    } else if (gateName == "magic-dagger") {
      return 'This is the conjugate transpose of "magic" gate.';
    } else if (gateName == "canonical") {
      return 'The canonical gate is a 3-parameter quantum logic gate that acts on two qubits and appears in Kraus-Cirac decomposition.';
    } else if (gateName == "givens") {
      return 'This "givens" gate is defined as: exp(-i * θ/2 * (X⊗X - Y⊗Y)). The range for θ is [0, 4π). The Givens gate occurs in quantum computational chemistry and when expressed as a canonical gate is equivalent to Canonical(θ/π, θ/π, 0). Equivalence between two gates means they have the same unitary operator up to a global phase factor.';
    } else if (gateName == "cross-resonance") {
      return 'The "cross-resonance" gate (CR) for superconducting qubits implements a ZX interaction and is defined as: exp(-i * θ/2 * (Z⊗X)). Because in real life the CR gate is implemented using weakly anharmonic transmon qubits in practice there exist other smaller interactions terms in the interaction hamiltonian besides the dominant Z⊗X term. The CR gate is maximally entangling at θ = π/2.';
    } else if (gateName == "cross-resonance-dagger") {
      return 'The "cross-resonance-dagger" is the conjugate transpose of "cross-resonance" gate and is defined as: exp(i * θ/2 * (Z⊗X)). Because in real life the CR gate is implemented using weakly anharmonic transmon qubits in practice there exist other smaller interactions terms in the interaction hamiltonian besides the dominant Z⊗X term. The CR gate is maximally entangling at θ = π/2.';
    } else if (gateName == "circuit") {
      return 'This is a special gate which is used to reuse as a subcircuit a quantum circuit defined in the same project with your current circuit \
      While using this gate, you should be aware that a circuit cannot contain itself, either directly or indirectly via its subcircuits.';
    } else if (gateName == "barrier") {
      return 'In the context of IBMQ, a barier indicates a boundary in a circuit across which optimizations or circuit re-writes are not \
      performed during transpiling phase. In the limited context of Uranium, the barrier may be used to separate different portions of a \
      circuit in order to make the implementation of an algorithm more readable. However please keep in mind the IBMQ usecase which will \
      apply when (sooner rather than later) you will be able to execute your circuits directly on IBMQ devices.'
    }

    return "In order to work with the Circuit Editor use the gates pallete on the left to drag & drop gates in the circuit \
            at the desired position defined by a target qubit and a desired step. Once a gate is placed in the circuit, it's position \
            can be easily adjusted: drag and drop gestures work for both the target and the control qubits. For any gate, a single click \
            on a gate pictogram over a target qubit opens a pop-up control which allows editing the gate settings, adding or removing \
            controls and deleting the gate. The same pop-up dialog can be used to add values for parameters in parametric gates or to assign \
            the index of the classic bit used as mesurement target by the measure gates. \
            <br><br> \
            <b> One gate into many:</b> \
            <br/> \
            <br/> \
            - if the <i>'Shift'</i> key is pressed during performing a drag & drop gesture, the original gate is not removed and an identical copy \
            of the gate is created at the drop location in the circuit. <br>\
            - if the <i>'Alt'</i> key is pressed during drag & drop and the direction of movement is strictly horizontal or strictly vertical an array \
            of identical gates (horizontal or vertical) is created between the intial drag qubit and the drop qubit. Any gate can be replicated \
            using this method horizontally, only single qubit gates can be replicated vertically.<br>\
            - once a gate has been added to the circuit it can be replicated in a rectangular array. This permits generating an arbitrarily large family \
            of gates with only a few mouse clicks. For more details on how this works please check out the help button on replicate \
            gates pop-up dialog which can be launched by clicking the lower left icon in a gate popup dialog. <br> \
            <br> \
            <b> Deleting gates:</b> \
            <br/> \
            <br/> \
            - a gate can be deleted from the gate pop-up dialog. <br> \
            - a gate can also be deleted by dragging the gate and dropping it outside the editor area. <br> \
            - a gate can also be deleted by pressing the <i>'d'</i> or <i>'D'</i> key while clicking the image of a gate in the circuit.  <br> \
            <br> \
            <b> Working with controls:</b> \
            <br/> \
            <br/> \
            - controls can be added from the controls editing dialog which can be launched from the modal gate pop-up dialog. <br> \
            - controls can also be added by dragging a control icon from the top left panel to any position in circuit. The editor \
            will figure out which is the nearest gate in order to attach the control to. <br> \
            - clicking over a control qubit opens up a pop-up dialog where control settings can be adjusted or the control can be removed. <br> \
            - a control can also be deleted by pressing the <i>'d'</i> or <i>'D'</i> key while clicking the control image in the circuit.  <br> \
            - a control position can be adjusted by dragging the control image similar to how it's done for regular gate. <br> \
            - if the <i>'Shift'</i> key is pressed during dragging a control qubit the original control is not removed and a copy of the \
            control is placed at the drop location.  <br> \
            <br> \
            <b> Copy & Paste:</b> \
            <br/> \
            <br/> \
            <i>Ctrl</i> + <i>Click</i> gesture over a gate or an empty cell can be used to select that cell. The effect of a second \
            <i>Ctrl</i> + <i>Click</i> gesture will be to select a rectangular portion of the circuit. Once one ore more gates have been selected \
            the <i>Ctrl</i> + <i>C</i>, <i>Ctrl</i> + <i>V</i>, <i>Ctrl</i> + <i>X</i>, <i>Esc</i> and <i>Delete</i> keys work as you would expect \
            for those gates which have <i>target</i> qubits inside the selected area. <br> \
            <br> \
            <b> Measure gates:</b> \
            <br/> \
            <br/> \
            - since we use a simulator, it does not make sense to sample the final state vector but instead we show directly the simulation \
            results as an array of probabilities corresponding each possible state. As such, when measure gates are added to a circuit \
            their role is not to make a measurement at the end of simulation but to indicate the classic bit that qubit would be measured into \
            if the circuit were to be run on real quantum computer. <br>\
            - you can set up any classic bit index to a measure gate as long as the bit index is not larger than the maximum qubit index. \
            Measure gates must be always placed last for any given qubit. <br>\
            - if multiple qubits share the same classic bit than simulation results for that bit is given by addition modulo 2 of individual measurement results. <br> \
            - if measure gates are missing altogether the simulation results are identical with the situation where each qubit has attached \
            as the last gate a measure gate in the Z basis whose classic bit is equal to the qubit index. <br> \
            - whenever a gate is dragged in  a new position, the classic bit index is automatically set equal to the qubit index. This is still \
            true even if the shift key is pressed during drag & drop which means that in this particular case the original gate is not copied \
            identically as it is actually done for the other gates. \
            <br> \
            <br> \
            <b> Changing number of steps/qubits:</b> \
            <br/> \
            <br/> \
            - the ± button in the toolbar allows changing the number of qubits and steps in the circuit. <br> \
            - while increasing the number of steps and/or qubits may sometimes be a necessity, decreasing the number of steps/qubits \
            does not make sense in general since the qubits/steps which are not used will be simply ignored. One exception to this \
            recommendation is the situation where you want to make the circuit editor surface smaller in order to save the circuit \
            as a svg image. <br> \
            -  steps or qubits can be removed from a pop-up dialog which is opened by double clicking on an empty cell in the circuit. \
            <br> \
            <br> \
            <b> Getting help for gates:</b> \
            <br/> \
            <br/> \
            - in order to see in this dashboard help information regarding a particular gate, select the gate in left panel gates pallete and \
            than press the help button on the toolbar. \
            <br> \
            <br> \
            <b> Way of working:</b> \
            <br/> \
            <br/> \
            - we provide a link towards the circuit editor on our platform frontpage in order for new vistors to be able to easily explore \
            it's features. However, that view does not allow saving circuits in a database, it only permits saving circuits to files. \
            We recommend that you follow the 'My Projects' link on our platform frontpage, create a new project and continue your work from there. \
            <br> \
            <br> \
            <b> Representation of states:</b> \
            <br> \
            <br> \
            - the Bloch sphere Z-bazis state vectors are conventionally named: |0⟩ and |1⟩. The Z-basis is usually refered to as the computational or \
            standard basis. The other bases commonly used are the X-basis: |+⟩ = 1/√2(|0⟩ + |1⟩), |-⟩ = 1/√2(|0⟩ - |1⟩) and the \
            Y-basis: |+i⟩ = 1/√2(|0⟩ + i|1⟩), |-i⟩ = 1/√2(|0⟩ - i|1⟩). \
            <br/> \
            <br/> \
            <b> Ordering of bits and qubits:</b> \
            <br> \
            <br> \
            - when simulating a circuit the gates in circuit editor are applied from left to right which is the generally accepted convention. \
            <br> \
            - visually, the circuit editor has an implicit ordering of qubits from top to bottom where the qubit with index zero is placed on top \
            and the qubit with highest index is placed at the bottom of the editor. \
            <br> \
            - A valid question to be asked is how should the state vector be represented for a quantum register that consists of a given number of qubits. \
            In principle, these qubits can be orderer either from left to right or from right to left. In most physics textbooks qubits are ordered \
            starting with the first one (lowest qubit index) on the left and last one (higher qubit index) on the right when representing a state vector \
            as a tensor product of single qubit states. This is typically refered to as big endian convention. However many commercial quantum computing \
            platform use the little endian convention which means the order of qubits (as well as bits in classical registers) is reversed. \
            In Uranium you can choose either one of the two orderings."

}

export function retriveControlledGateHelpHtml(gateName) {

  if (gateName == "u3") {
      return 'An "u3" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "u3" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "u2") {
      return 'An "u2" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "u2" gate typically performs a generic (two parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "hadamard") {
      return 'A "hadamard" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "hadamard" gate typically applies a "hadamard" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "pauli-x") {
      return 'A "pauli-x" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-x" gate typically performs the "pauli-x" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. When it has one control this gate is also known as CNOT gate. When it has two controls this gate is also known as CCNOT or Toffoli gate.';
  } else if (gateName == "pauli-y") {
      return 'A "pauli-y" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-y" gate typically performs the "pauli-y" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "pauli-z") {
      return 'A "pauli-z" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-z" gate typically performs the "pauli-z" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. The single controlled "pauli-z" gate is also known as CPHASE gate and has the particular property that is symmetric, which means that swapping the control with the target qubit does not modify the result when applying the gate.';
  } else if (gateName == "u1") {
      return 'An "u1" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "u1" gate typically applies the "u1" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "p") {
    return 'A "p" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "p" gate typically applies the "p" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "rx-theta") {
      return 'A "rx-theta" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "rx-theta" gate typically applies the "rx-theta" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "ry-theta") {
      return 'A "ry-theta" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "ry-theta" gate typically applies the "ry-theta" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "rz-theta") {
      return 'A "rz-theta" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "rz-theta" gate typically applies the "rz-theta" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "s") {
      return 'A "s" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "s" gate typically applies the "s" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "s-dagger") {
      return 'A gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "s-dagger" gate typically applies the "s-dagger" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "t") {
      return 'A "t" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "t" gate typically applies the "t" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "t-dagger") {
      return 'A "t-dagger" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "t-dagger" gate typically applies the "t-dagger" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "pauli-x-root") {
      return 'A "pauli-x-root" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-x-root" gate typically performs the "pauli-x-root" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. ';
  } else if (gateName == "pauli-y-root") {
      return 'A "pauli-y-root" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-y-root" gate typically performs the "pauli-y-root" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. ';
  } else if (gateName == "pauli-z-root") {
      return 'A "pauli-z-root" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-z-root" gate typically performs the "pauli-z-root" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. ';
  } else if (gateName == "pauli-x-root-dagger") {
      return 'A "pauli-x-root-dagger" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-x-root-dagger" gate typically performs the "pauli-x-root-dagger" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. ';
  } else if (gateName == "pauli-y-root-dagger") {
      return 'A "pauli-y-root-dagger" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-y-root-dagger" gate typically performs the "pauli-y-root-dagger" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. ';
  } else if (gateName == "pauli-z-root-dagger") {
      return 'A "pauli-z-root-dagger" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-z-root-dagger" gate typically performs the "pauli-z-root-dagger" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. ';
  } else if (gateName == "qft") {
    return 'A "qft" gate may have any number of controls.';
  } else if (gateName == "qft-dagger") {
    return 'A "qft-dagger" gate may have any number of controls.';
  } else if (gateName == "swap") {
    return 'The simplest controlled swap gate, also known as Fredkin gate, acts on three qubits and performs a controlled swap when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. The matrix representation of the Fredkin gate is:';
  } else if (gateName == "aggregate") {
    return 'An "aggregate" gate may have any number of controls. This is equivalent to a set of distinct single target qubit gates sharing the same set of controls.';
  } else if (gateName == "identity") {
    return '';
  }else if (gateName == "measure-x") {
    return '';
  } else if (gateName == "measure-y") {
    return '';
  } else if (gateName == "measure-z") {
    return '';
  } else if (gateName == "sqrt-swap") {
    return 'A "sqrt-swap" gate may have any number of controls.';
  }  else if (gateName == "swap-theta") {
    return 'A "swap-theta" gate may have any number of controls.';
  } else if (gateName == "iswap") {
    return 'An "iswap" gate may have any number of controls.';
  } else if (gateName == "xx") {
    return 'A "xx" gate may have any number of controls.';
  } else if (gateName == "yy") {
    return 'A "yy" gate may have any number of controls.';
  } else if (gateName == "zz") {
    return 'A "zz" gate may have any number of controls.';
  } else if (gateName == "v") {
    return 'A "v" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "v" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "v-dagger") {
    return 'A "v-dagger" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "v-dagger" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "h") {
    return 'A "h" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "h" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  }  else if (gateName == "h-dagger") {
    return 'A "h-dagger" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "h-dagger" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "hadamard-xy") {
    return 'A "hadamard-xy" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "hadamard-xy" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "hadamard-yz") {
    return 'A "hadamard-yz" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "hadamard-yz" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  }  else if (gateName == "hadamard-zx") {
    return 'A "hadamard-zx" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "hadamard-zx" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "c") {
    return 'A "c" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "c" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "c-dagger") {
    return 'A "c-dagger" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "c-dagger" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "fswap") {
    return 'A "fswap" gate may have any number of controls.';
  } else if (gateName == "swap-root") {
    return 'A "swap-root" gate may have any number of controls.';
  } else if (gateName == "swap-root-dagger") {
    return 'A "swap-root-dagger" gate may have any number of controls.';
  }else if (gateName == "sqrt-swap-dagger") {
    return 'A "sqrt-swap-dagger" gate may have any number of controls.';
  } else if (gateName == "molmer-sorensen") {
    return 'A "molmer-sorensen" gate may have any number of controls.';
  } else if (gateName == "molmer-sorensen-dagger") {
    return 'A "molmer-sorensen-dagger" gate may have any number of controls.';
  } else if (gateName == "xy") {
    return 'A "xy" gate may have any number of controls.';
  } else if (gateName == "a") {
    return 'An "a" gate may have any number of controls.';
  } else if (gateName == "berkeley") {
    return 'A "berkeley" gate may have any number of controls.';
  } else if (gateName == "berkeley-dagger") {
    return 'A "berkeley-dagger" gate may have any number of controls.';
  } else if (gateName == "w") {
    return 'A "w" gate may have any number of controls.';
  } else if (gateName == "ecp") {
    return 'An "ecp" gate may have any number of controls.';
  } else if (gateName == "ecp-dagger") {
    return 'An "ecp-dagger" gate may have any number of controls.';
  } else if (gateName == "magic") {
    return 'A "magic" gate may have any number of controls.';
  } else if (gateName == "magic-dagger") {
    return 'A "magic-dagger" gate may have any number of controls.';
  }else if (gateName == "canonical") {
    return 'A "canonical" gate may have any number of controls.';
  } else if (gateName == "givens") {
    return 'A "givens" gate may have any number of controls.';
  } else if (gateName == "cross-resonance") {
    return 'A "cross-resonance" gate may have any number of controls.';
  } else if (gateName == "cross-resonance-dagger") {
    return 'A "cross-resonance-dagger" gate may have any number of controls.';
  } else if (gateName == "circuit") {
    return 'Any number of controls can be attached to this gate.';
  } else if (gateName == "barrier") {
    return '';
  }

  return "";
}

export function retriveGateMatrixHtml(gateName) {

    if (gateName == "u3") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
                <table ><table class='matrix'> \
                <tr>\
                <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
                <td style='padding: 5px; text-align: center;'>-e<sup>iλ</sup>&nbsp;sin(θ/2)</td>\
                </tr>\
                <tr>\
                    <td style='padding: 5px; text-align: center;'>e<sup>iφ</sup>&nbsp;sin(θ/2)</td>\
                    <td style='padding: 5px; text-align: center;'>e<sup>i(φ + λ)</sup>&nbsp;cos(θ/2)</td>\
                </tr>\
                </table></td></table>";
    } else if (gateName == "u2") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
                <div style='font-size:13px;'>1/√2&nbsp;</div><table class='matrix'> \
                <tr>\
                    <td style='padding: 5px; text-align: center;'>1</td>\
                    <td style='padding: 5px; text-align: center;'>-&nbspe<sup>iλ</sup></td>\
                </tr>\
                <tr>\
                    <td style='padding: 5px; text-align: center;'>e<sup>iφ</sup></td>\
                    <td style='padding: 5px; text-align: center;'>e<sup>i(φ + λ)</sup></td>\
                </tr>\
                </table>";
    } else if (gateName == "hadamard") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
                <table><td><div style='font-size: 13px;'>1/√2&nbsp;&nbsp;</div> </td> <td><table class='matrix'> \
                <tr>\
                    <td style='padding: 5px; text-align: center;'>1</td>\
                    <td style='padding: 5px; text-align: center;'>1</td>\
                </tr>\
                <tr>\
                    <td style='padding: 5px; text-align: center;'>1</td>\
                    <td style='padding: 5px; text-align: center;'>-&nbsp1</td>\
                </tr>\
                </table></td></table>";
    } else if (gateName == "aggregate") {
        return "";
    } else if (gateName == "identity") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      </table>";
    } else if (gateName == "pauli-x") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-y") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>-&nbspi</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>i</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-z") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp1</td>\
        </tr>\
        </table>";
    } else if (gateName == "u1") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iλ</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "p") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>e<sup>iθ</sup></td>\
      </tr>\
      </table>";
    } else if (gateName == "t") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iπ/4</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "t-dagger") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>-&nbsp;iπ/4</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "rx-theta") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;i&nbsp;sin(θ/2)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;i&nbsp;sin(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
        </tr>\
        </table>";
    } else if (gateName == "ry-theta") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;sin(θ/2)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>sin(θ/2)</td>\
            <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
        </tr>\
        </table>";
    } else if (gateName == "rz-theta") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>e<sup>-&nbsp;iθ/2</sup></td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iθ/2</sup></td>\
        </tr>\
        </table>";
    } else if (gateName == "s") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>i</td>\
        </tr>\
        </table>";
    } else if (gateName == "s-dagger") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;i</td>\
        </tr>\
        </table>";
    } else if (gateName == "swap") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    } else if (gateName == "sqrt-swap") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 + i)</td>\
            <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 - i)</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 - i)</td>\
            <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 + i)</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    } else if (gateName == "swap-theta") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iθ</sup></td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>e<sup>iθ</sup></td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    } else if (gateName == "iswap") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>i</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>i</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    }  else if (gateName == "xx") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2x; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
        </tr>\
        </table>";
    }  else if (gateName == "yy") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>i&nbsp;sin(θ/2)</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2x; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>i&nbsp;sin(θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
        </tr>\
        </table>";
    }  else if (gateName == "zz") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix' style='font-size: 12px;'> \
        <tr>\
            <td style='padding: 2px; text-align: center;'>exp(-i * θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>exp(i * θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2x; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>exp(i * θ/2)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>exp(-i * θ/2)</td>\
        </tr>\
        </table>";
    } else if (gateName == "xy") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 2px; text-align: center;'>1</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ)</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ)</td>\
            <td style='padding: 2x; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ)</td>\
            <td style='padding: 2px; text-align: center;'>cos(θ)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>1</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-x-root") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <div style='font-size:13px;'>exp(i&nbsp;π/(2t))</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
            <td style='padding: 5px; text-align: center;'>-i&nbsp;sin(π/(2t))</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>-i&nbsp;sin(π/(2t))</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-y-root") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <div style='font-size:13px;'>exp(i&nbsp;π/(2t))</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;sin(π/(2t))</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>sin(π/(2t))</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-z-root") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(iπ/t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-x-root-dagger") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <div style='font-size:13px;'>exp(-i&nbsp;π/(2t))</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
            <td style='padding: 5px; text-align: center;'>i&nbsp;sin(π/(2t))</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>i&nbsp;sin(π/(2t))</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-y-root-dagger") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <div style='font-size:13px;'>exp(-i&nbsp;π/(2t))</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
            <td style='padding: 5px; text-align: center;'>&nbsp;sin(π/(2t))</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;sin(π/(2t))</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-z-root-dagger") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>1</td>\
            <td style='padding: 5px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>0</td>\
            <td style='padding: 5px; text-align: center;'>exp(-iπ/t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "v") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table><td><div style='font-size: 13px;'>1/2&nbsp;&nbsp;</div> </td> <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1 + i</td>\
          <td style='padding: 5px; text-align: center;'>1 - i</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>1 - i</td>\
          <td style='padding: 5px; text-align: center;'>1 + i</td>\
      </tr>\
      </table>";
    } else if (gateName == "v-dagger") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table><td><div style='font-size: 13px;'>1/2&nbsp;&nbsp;</div> </td> <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1 - i</td>\
          <td style='padding: 5px; text-align: center;'>1 + i</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>1 + i</td>\
          <td style='padding: 5px; text-align: center;'>1 - i</td>\
      </tr>\
      </table>";
    } else if (gateName == "h") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table><td><div style='font-size: 13px;'>1/√2&nbsp;&nbsp;</div> </td> <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>-&nbsp1</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      </table></td></table>";
    } else if (gateName == "h-dagger") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table><td><div style='font-size: 13px;'>1/√2&nbsp;&nbsp;</div> </td> <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>-&nbsp1</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      </table></td></table>";
    } else if (gateName == "hadamard-xy") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table><td><div style='font-size: 13px;'>1/√2&nbsp;&nbsp;</div> </td> <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1 + i</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>1 - i</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      </table></td></table>";
    } else if (gateName == "hadamard-yz") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table><td><div style='font-size: 13px;'>1/√2&nbsp;&nbsp;</div> </td> <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>-&nbspi</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>i</td>\
          <td style='padding: 5px; text-align: center;'>-&nbsp1</td>\
      </tr>\
      </table></td></table>";
    } else if (gateName == "hadamard-zx") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table><td><div style='font-size: 13px;'>1/√2&nbsp;&nbsp;</div> </td> <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>-&nbsp1</td>\
      </tr>\
      </table></td></table>";
    } else if (gateName == "c") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
          <table><td><div style='font-size: 13px;'>1/2&nbsp;&nbsp;</div> </td> <td><table class='matrix'> \
          <tr>\
              <td style='padding: 5px; text-align: center;'>+&nbsp1 - i</td>\
              <td style='padding: 5px; text-align: center;'>-&nbsp1 - i</td>\
          </tr>\
          <tr>\
              <td style='padding: 5px; text-align: center;'>+&nbsp1 - i</td>\
              <td style='padding: 5px; text-align: center;'>+&nbsp1 + i</td>\
          </tr>\
          </table>";
    } else if (gateName == "c-dagger") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
          <table><td><div style='font-size: 13px;'>1/2&nbsp;&nbsp;</div> </td> <td><table class='matrix'> \
          <tr>\
              <td style='padding: 5px; text-align: center;'>+&nbsp1 + i</td>\
              <td style='padding: 5px; text-align: center;'>+&nbsp1 + i</td>\
          </tr>\
          <tr>\
              <td style='padding: 5px; text-align: center;'>-&nbsp1 + i</td>\
              <td style='padding: 5px; text-align: center;'>+&nbsp1 - i</td>\
          </tr>\
          </table>";
    } else if (gateName == "measure-x") {
        return "";
    } else if (gateName == "measure-y") {
        return "";
    } else if (gateName == "measure-z") {
        return "";
    } else if (gateName == "fswap") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-1</td>\
      </tr>\
      </table>";
    } else if (gateName == "swap-root") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <div style='font-size:13px;'>exp(-i&nbsp;π/4t)&nbsp*</div> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>exp(i&nbsp;π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>i&nbsp;sin(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>i&nbsp;sin(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(i&nbsp;π/(2t))</td>\
      </tr>\
      </table>";
    } else if (gateName == "swap-root-dagger") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <div style='font-size:13px;'>exp(i&nbsp;π/4t)&nbsp*</div> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>exp(-i&nbsp;π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>-i&nbsp;sin(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-i&nbsp;sin(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>cos(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(-i&nbsp;π/(2t))</td>\
      </tr>\
      </table>";
    } else if (gateName == "sqrt-swap-dagger") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 - i)</td>\
          <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 + i)</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 + i)</td>\
          <td style='padding: 5px; text-align: center;'>1/2&nbsp;(1 - i)</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      </table>";
    } else if (gateName == "molmer-sorensen") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table>\
      <td>1/√2&nbsp;*&nbsp;&nbsp;</td> \
      <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>i</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>i</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>i</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>i</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      </table></td>\
      </table>";
    } else if (gateName == "molmer-sorensen-dagger") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table>\
      <td>1/√2&nbsp;*&nbsp;&nbsp;</td> \
      <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-i</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>-i</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-i</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>-i</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      </table></td>\
      </table>";
    } else if (gateName == "a") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 2px; text-align: center;'>1</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>cos(θ)</td>\
          <td style='padding: 2px; text-align: center;'>exp(iφ) * sin(θ)</td>\
          <td style='padding: 2x; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>exp(-iφ) * sin(θ)</td>\
          <td style='padding: 2px; text-align: center;'>-cos(θ)</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>1</td>\
      </tr>\
      </table>";
    } else if (gateName == "berkeley") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 2px; text-align: center;'>cos(π/8)</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>i&nbsp;sin(π/8)</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>cos(3&nbsp;π/8)</td>\
          <td style='padding: 2px; text-align: center;'>i&nbsp;sin(3&nbsp;π/8)</td>\
          <td style='padding: 2x; text-align: center;'>0</td>\
      </tr>\
      <tr>\
      <td style='padding: 2px; text-align: center;'>0</td>\
      <td style='padding: 2px; text-align: center;'>i&nbsp;sin(3&nbsp;π/8)</td>\
      <td style='padding: 2px; text-align: center;'>cos(3&nbsp;π/8)</td>\
      <td style='padding: 2x; text-align: center;'>0</td>\
      </tr>\
      <tr>\
      <td style='padding: 2px; text-align: center;'>i&nbsp;sin(π/8)</td>\
      <td style='padding: 2px; text-align: center;'>0</td>\
      <td style='padding: 2px; text-align: center;'>0</td>\
      <td style='padding: 2px; text-align: center;'>cos(π/8)</td>\
      </tr>\
      </table>";
    } else if (gateName == "berkeley-dagger") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 2px; text-align: center;'>cos(π/8)</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(π/8)</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>cos(3&nbsp;π/8)</td>\
          <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(3&nbsp;π/8)</td>\
          <td style='padding: 2x; text-align: center;'>0</td>\
      </tr>\
      <tr>\
      <td style='padding: 2px; text-align: center;'>0</td>\
      <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(3&nbsp;π/8)</td>\
      <td style='padding: 2px; text-align: center;'>cos(3&nbsp;π/8)</td>\
      <td style='padding: 2x; text-align: center;'>0</td>\
      </tr>\
      <tr>\
      <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(π/8)</td>\
      <td style='padding: 2px; text-align: center;'>0</td>\
      <td style='padding: 2px; text-align: center;'>0</td>\
      <td style='padding: 2px; text-align: center;'>cos(π/8)</td>\
      </tr>\
      </table>";
    } else if (gateName == "w") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1/√2</td>\
          <td style='padding: 5px; text-align: center;'>1/√2</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1/√2</td>\
          <td style='padding: 5px; text-align: center;'>-1/√2</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      </table>";
    } else if (gateName == "ecp") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table>\
      <td>1/2&nbsp;*&nbsp;&nbsp;</td> \
      <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>2c</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-i2s</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>(1+i)(c-s)</td>\
          <td style='padding: 5px; text-align: center;'>(1-i)(c+s)</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>(1-i)(c+s)</td>\
          <td style='padding: 5px; text-align: center;'>(1+i)(c-s)</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
        <td style='padding: 5px; text-align: center;'>-i2s</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>2c</td>\
        </tr>\
        </table></td>\
        </table> <br/> where c = cos(π/8) and s =  sin(π/8).";
    }else if (gateName == "ecp-dagger") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table>\
      <td>1/2&nbsp;*&nbsp;&nbsp;</td> \
      <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>2c</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>i2s</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>(1-i)(c-s)</td>\
          <td style='padding: 5px; text-align: center;'>(1+i)(c+s)</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>(1+i)(c+s)</td>\
          <td style='padding: 5px; text-align: center;'>(1-i)(c-s)</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
        <td style='padding: 5px; text-align: center;'>i2s</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>2c</td>\
        </tr>\
        </table></td>\
        </table> <br/> where c = cos(π/8) and s =  sin(π/8).";
    } else if (gateName == "magic") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table>\
      <td>1/√2&nbsp;*&nbsp;&nbsp;</td> \
      <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>i</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>i</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>i</td>\
          <td style='padding: 5px; text-align: center;'>-1</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>-i</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      </table></td>\
      </table>";
    } else if (gateName == "magic-dagger") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table>\
      <td>1/√2&nbsp;*&nbsp;&nbsp;</td> \
      <td><table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>-i</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>i</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-i</td>\
          <td style='padding: 5px; text-align: center;'>-i</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>-1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      </table></td>\
      </table>";
    }else if (gateName == "canonical") {
      return "";
    } else if (gateName == "givens") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 2px; text-align: center;'>1</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>cos(θ)</td>\
          <td style='padding: 2px; text-align: center;'>-&nbsp;sin(θ)</td>\
          <td style='padding: 2x; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>sin(θ)</td>\
          <td style='padding: 2px; text-align: center;'>cos(θ)</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>1</td>\
      </tr>\
      </table>";
    } else if (gateName == "cross-resonance") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2x; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>i&nbsp;sin(θ/2)</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>i&nbsp;sin(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
      </tr>\
      </table>";
    } else if (gateName == "cross-resonance-dagger") {
      return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>i&nbsp;sin(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>i&nbsp;sin(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2x; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
      </tr>\
      <tr>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>0</td>\
          <td style='padding: 2px; text-align: center;'>-i&nbsp;sin(θ/2)</td>\
          <td style='padding: 2px; text-align: center;'>cos(θ/2)</td>\
      </tr>\
      </table>";
    }

    return "";
}

export function retriveControlledGateMatrixHtml(gateName) {

  if (gateName == "u3") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ u3, as:</div> <br/> \
      <table class='matrix' > \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
          <td style='padding: 5px; text-align: center;'>-e<sup>iλ</sup>&nbsp;sin(θ/2)</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>e<sup>iφ</sup>&nbsp;sin(θ/2)</td>\
          <td style='padding: 5px; text-align: center;'>e<sup>i(φ + λ)</sup>&nbsp;cos(θ/2)</td>\
      </tr>\
      </table>";
  } else if (gateName == "u2") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ u2, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1/√2</td>\
          <td style='padding: 5px; text-align: center;'>-1/√2&nbsp;e<sup>iλ</sup></td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1/√2&nbsp;e<sup>iφ</sup></td>\
          <td style='padding: 5px; text-align: center;'>1/√2&nbsp;e<sup>i(φ + λ)</sup></td>\
      </tr>\
      </table>";
  } else if (gateName == "hadamard") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ hadamard, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1/√2</td>\
          <td style='padding: 5px; text-align: center;'>1/√2</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1/√2</td>\
          <td style='padding: 5px; text-align: center;'>-&nbsp;1/√2</td>\
      </tr>\
      </table>";
  } else if (gateName == "pauli-x") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-x, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      </table>";
  } else if (gateName == "pauli-y") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-y, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-&nbsp;i</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>i</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      </table>";
  } else if (gateName == "pauli-z") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-z, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-&nbsp;1</td>\
      </tr>\
      </table>";
  } else if (gateName == "rx-theta") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ rx-theta, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
          <td style='padding: 5px; text-align: center;'>-&nbsp;i&nbsp;sin(θ/2)</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-&nbsp;i&nbsp;sin(θ/2)</td>\
          <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
      </tr>\
      </table>";
  } else if (gateName == "ry-theta") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ ry-theta, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
          <td style='padding: 5px; text-align: center;'>-&nbsp;sin(θ/2)</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>sin(θ/2)</td>\
          <td style='padding: 5px; text-align: center;'>cos(θ/2)</td>\
      </tr>\
      </table>";
  } else if (gateName == "rz-theta") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ rz-theta, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>e<sup>-&nbsp;iθ/2</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>e<sup>iθ/2</td>\
      </tr>\
      </table>";
  } else if (gateName == "s") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ s, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>i</td>\
      </tr>\
      </table>";
  } else if (gateName == "s-dagger") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ s-dagger, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-&nbsp;i</td>\
      </tr>\
      </table>";
  } else if (gateName == "u1") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ u1, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>e<sup>iλ</sup></td>\
      </tr>\
      </table>";
  } else if (gateName == "p") {
    return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ u1, as:</div> <br/> \
    <table class='matrix'> \
    <tr>\
        <td style='padding: 5px; text-align: center;'>1</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
    </tr>\
    <tr>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>1</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
    </tr>\
    <tr>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>1</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
    </tr>\
    <tr>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>e<sup>iθ</sup></td>\
    </tr>\
    </table>";
  } else if (gateName == "t") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ t, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>e<sup>iπ/4</sup></td>\
      </tr>\
      </table>";
  } else if (gateName == "t-dagger") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ t-dagger, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>e<sup>-&nbsp;iπ/4</sup></td>\
      </tr>\
      </table>";
  } else if (gateName == "pauli-x-root") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-x-root, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(iπ/(2t))&nbsp;cos(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>-i&nbsp;exp(iπ/(2t))&nbsp;sin(π/(2t))</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-i&nbsp;exp(iπ/(2t))&nbsp;sin(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>exp(iπ/(2t))&nbsp;cos(π/(2t))</td>\
      </tr>\
      </table>";
  } else if (gateName == "pauli-y-root") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-y-root, as:</div> <br/> \
      <table class='matrix' > \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(iπ/(2t))&nbsp;cos(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>-exp(iπ/(2t))&nbsp;sin(π/(2t))</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(iπ/(2t))&nbsp;sin(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>exp(iπ/(2t))&nbsp;cos(π/(2t))</td>\
      </tr>\
      </table>";
  } else if (gateName == "pauli-z-root") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-z-root, as:</div> <br/> \
      <table class='matrix' > \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(iπ/t)</td>\
      </tr>\
      </table>";
  } else if (gateName == "pauli-x-root-dagger") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-x-root-dagger, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(-iπ/(2t))&nbsp;cos(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>i&nbsp;exp(-iπ/(2t))&nbsp;sin(π/(2t))</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>i&nbsp;exp(-iπ/(2t))&nbsp;sin(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>exp(-iπ/(2t))&nbsp;cos(π/(2t))</td>\
      </tr>\
      </table>";
  } else if (gateName == "pauli-y-root-dagger") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-y-root-dagger, as:</div> <br/> \
      <table class='matrix' > \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(-iπ/(2t))&nbsp;cos(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>-exp(-iπ/(2t))&nbsp;sin(π/(2t))</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(-iπ/(2t))&nbsp;sin(π/(2t))</td>\
          <td style='padding: 5px; text-align: center;'>exp(-iπ/(2t))&nbsp;cos(π/(2t))</td>\
      </tr>\
      </table>";
  } else if (gateName == "pauli-z-root-dagger") {
      return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ pauli-z-root, as:</div> <br/> \
      <table class='matrix'> \
      <tr>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>1</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(-iπ/t)</td>\
      </tr>\
      </table>";
  } else if (gateName == "swap") {
    return "<div style='text-align: left;'> \
    <table class='matrix'> \
    <tr>\
        <td style='padding: 5px; text-align: center;'>1</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
    </tr>\
    <tr>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>1</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
    </tr>\
    <tr>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>1</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
    </tr>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>1</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
    </tr>\
    <tr>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>1</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
    </tr>\
    <tr>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>1</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
    </tr>\
    <tr>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>1</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
    </tr>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>0</td>\
        <td style='padding: 5px; text-align: center;'>1</td>\
    </tr>\
    </table>";
  }  else if (gateName == "v") {
    return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ v.</div>"
  } else if (gateName == "v-dagger") {
    return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ v-dagger.</div>"
  } else if (gateName == "h-dagger") {
    return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ h-dagger.</div>"
  }  else if (gateName == "h") {
    return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ h.</div>"
  } else if (gateName == "hadamard-xy") {
    return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ hadamard-xy.</div>"
  } else if (gateName == "hadamard-yz") {
    return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ hadamard-yz.</div>"
  }  else if (gateName == "hadamard-zx") {
    return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ hadamard-zx.</div>"
  } else if (gateName == "c") {
    return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ c.</div>"
  } else if (gateName == "c-dagger") {
    return "<div style='text-align: left;'> For the most elementary case where there is only one control qubit and the control state is |1⟩, the matrix representation of this gate can be calculated via the following formula: |0⟩⟨0| ⊗ id + |1⟩⟨1| ⊗ c-dagger.</div>"
  } else if (gateName == "fswap") {
    return "";
  } else if (gateName == "swap-root") {
    return "";
  } else if (gateName == "swap-root-dagger") {
    return "";
  } else if (gateName == "sqrt-swap-dagger") {
    return "";
  } else if (gateName == "molmer-sorensen") {
    return "";
  } else if (gateName == "xy") {
    return "";
  } else if (gateName == "a") {
    return "";
  } else if (gateName == "berkeley") {
    return "";
  } else if (gateName == "w") {
    return "";
  } else if (gateName == "ecp") {
    return "";
  } else if (gateName == "magic") {
    return "";
  } else if (gateName == "canonical") {
    return "";
  } else if (gateName == "givens") {
    return "";
  } else if (gateName == "qft") {
    return "";
  } else if (gateName == "qft-dagger") {
    return "";
  }

  return "";
}

export default {
    retriveSimpleGateHelpHtml,
    retriveGateMatrixHtml,

}
