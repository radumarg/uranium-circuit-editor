
export function retriveNoteHtml(gateName) {
  if (gateName){
    return 'Hint: unselect this gate in the gates pallete to see useful general hints for using the Circuit Editor.';
  } else {
    return 'Hint: select any gate in the gates pallete to see the documentation for that gate.'
  }
}

export function retriveSimpleGateHelpHtml(gateName) {

    if (gateName == "u3") {
        return 'This is a generic, three parametric, unitary single bit gate.';
    } else if (gateName == "u2") {
        return 'This is a generic, two parametric, unitary single bit gate and is defined as: u3(π/2, φ, λ).';
    } else if (gateName == "u1") {
        return 'This is a generic, one parameter, unitary single bit gate and is defined as: u3(0, 0, λ). The "u1" gate acts on a single qubit. Leaves the basis state |0⟩ unchanged and map |1⟩ to exp(i*λ)|1⟩. The probability of measuring a |0⟩ or |1⟩ is unchanged after applying this gate, however it modifies the phase of the quantum state. The z, s and t gates are special cases of "u1" for λ values given by π, π/2 and π/4 respectively.'
    } else if (gateName == "hadamard") {
        return 'The "hadamard" gate acts on a single qubit and is defined as: u2(0, π). This gate creates a superposition by mapping |0⟩ to |+⟩ and |1⟩ to |-⟩. It is the combination of two rotations, first a π rotation about the Z-axis of the Bloch sphere followed by a π/2 about the Y-axis. Alternatively, it can be represented as a π rotation around an axis diagonal in the Z-X plane. The Hadamard gate is the one-qubit version of the quantum Fourier transform.';
    } else if (gateName == "identity") {
        return 'The "identity" gate acts on a single qubit and preserves current state of the qubit it is applied to.';
    } else if (gateName == "pauli-x") {
        return 'The "pauli-x" gate acts on a single qubit and is defined as: u3(π, 0, π). With respect to the computational basis it is the quantum equivalent of the NOT gate for classical computers since it maps |0⟩ to |1⟩ and |1⟩ to |0⟩. It is equivalent to a rotation around the X-axis of the Bloch sphere by π radians.';
    } else if (gateName == "pauli-y") {
        return 'The "pauli-y" gate acts on a single qubit and is defined as: u3(π, π/2, π/2). It is equivalent to a rotation around the Y-axis of the Bloch sphere by π radians.';
    } else if (gateName == "pauli-z") {
        return 'The "pauli-z" gate acts on a single qubit and is defined as: u1(π). It is equivalent to a rotation around the Z-axis of the Bloch sphere by π radians. It is a special case of a phase shift gate "u1" with λ equal to π. It leaves the basis state |0⟩ unchanged and maps |1⟩ to −|1⟩.';
    } else if (gateName == "t") {
        return 'The "t" gate acts on a single qubit and is defined as: u1(π/4). It represents an anti-clockwise π/4 radians rotation around the Z-axis of the Bloch sphere. Leaves the basis state |0⟩ unchanged and map |1⟩ to exp(i*π/4)|1⟩. The probability of measuring a |0⟩ or |1⟩ is unchanged after applying this gate, however it modifies the phase of the quantum state. The "t" gate is related to "s" gate by the relation: s = t * t. The "t" gate is a special cases of "u1" for λ equal to π/4. This gate is an example of a non-Clifford gate.';
    } else if (gateName == "t-dagger") {
        return 'The "t-dagger" gate acts on a single qubit and is defined as: u1(-π/4). It is the conjugate transpose of "t" gate. It represents a clockwise π/4 radians rotation around the Z-axis of the Bloch sphere. Leaves the basis state |0⟩ unchanged and map |1⟩ to exp(-i*π/4) |1⟩. The probability of measuring a |0⟩ or |1⟩ is unchanged after applying this gate, however it modifies the phase of the quantum state. This gate is an example of a non-Clifford gate.';
    } else if (gateName == "rx-theta") {
        return 'The "rx-theta" gate acts on a single qubit and is defined as: u3(θ, -π/2, π/2). It is a anti-clockwise rotation through angle θ radians around the X-axis of the Bloch sphere and can be expressed in terms of X Pauli operator as: exp(-i * θ/2 * X).';
    } else if (gateName == "ry-theta") {
        return 'The "ry-theta" gate acts on a single qubit and is defined as: u3(θ, 0, 0). It is a anti-clockwise rotation through angle θ radians around the Y-axis of the Bloch sphere and can be expressed in terms of Y Pauli operator as: exp(-i * θ/2 *Y).';
    } else if (gateName == "rz-theta") {
        return 'The "rz-theta" gate acts on a single qubit and is different from u1(θ) by a global phase given by exp(-iθ/2). It is a anti-clockwise rotation through angle θ radians around the Z-axis of the Bloch sphere  and can be expressed in terms of Z Pauli operator as: exp(-i * θ/2 * Z).';
    } else if (gateName == "s") {
        return 'The "s" gate acts on a single qubit and is defined as: u1(π/2). It represents an anti-clockwise π/2 radians rotation around the Z-axis of the Bloch sphere. The "s" gate is related to the "t" gate by the relationship s = t * t. It is also the square root of pauli-z gate. The "s" gate is a special cases of "u1" for λ equal to π/2.';
    } else if (gateName == "s-dagger") {
        return 'The "s-dagger" gate acts on a single qubit and is defined as: u1(-π/2). It is the conjugate transpose of s gate. It represents a clockwise π/2 radians rotation around the Z-axis of the Bloch sphere.';
    } else if (gateName == "swap") {
        return 'This gate swaps two qubits.';
    } else if (gateName == "sqrt-swap") {
        return 'This gate performs half-way a two-qubit swap.  It the square root of swap gate.';
    } else if (gateName == "swap-theta") {
        return 'This gate performs partial a two-qubit swap.';
    } else if (gateName == "iswap") {
        return 'This gate performs partial a two-qubit swap.';
    } else if (gateName == "measure-x") {
        return 'Measures a qubit along the direction given by the X-axis of the Bloch sphere. This is not a unitary operation. The index of the classic bit where a qubit is measured cannot be larger than the maximum qubit index. \
When multiple qubits are measured in the same classical bit an XOR operation is performed on the bit value. When no measure gates are present in the circuit simulation results are identical to the situation where \
each qubit is measured into a classical bit with index equal to the qubit index of the measure gate.';
    } else if (gateName == "measure-y") {
        return 'Measures a qubit along the direction given by the Y-axis of the Bloch sphere. This is not a unitary operation. The index of the classic bit where a qubit is measured cannot be larger than the maximum qubit index. \
When multiple qubits are measured in the same classical bit an XOR operation is performed on the bit value. When no measure gates are present in the circuit simulation results are identical to the situation where \
each qubit is measured into a classical bit with index equal to the qubit index of the measure gate.';
    } else if (gateName == "measure-z") {
        return 'Measures a qubit along the direction given by the Z-axis of the Bloch sphere. This is not a unitary operation. The index of the classic bit where a qubit is measured cannot be larger than the maximum qubit index. \
When multiple qubits are measured in the same classical bit an XOR operation is performed on the bit value. When no measure gates are present in the circuit simulation results are identical to the situation where \
each qubit is measured into a classical bit with index equal to the qubit index of the measure gate.';
    } else if (gateName == "xx") {
        return 'XX Ising gate is a native gate for laser driven trapped ions devices and it is defined as: exp(-iπθ/2 * X⊗X). The Ising XX, YY and ZZ gates all commute with one another.';
    } else if (gateName == "yy") {
        return 'YY Ising gate is a native gate for laser driven trapped ions devices and it is defined as: exp(-iπθ/2 * Y⊗Y). The Ising XX, YY and ZZ gates all commute with one another.';
    } else if (gateName == "zz") {
        return 'ZZ Ising gate is a native gate for laser driven trapped ions devices and it is defined as: exp(-iπθ/2 * Z⊗Z). The Ising XX, YY and ZZ gates all commute with one another.';
    } else if (gateName == "pauli-x-root") {
        return 'The "pauli-x-root" gate is the root of a "pauli-x" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a anti-clockwise rotation around X-axis of Bloch sphere with an angle given by π/t or, depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-y-root") {
        return 'The "pauli-y-root" gate is the root of a "pauli-y" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a anti-clockwise rotation around Y-axis of Bloch sphere with an angle given by π/t or, depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-z-root") {
        return 'The "pauli-z-root" gate is the root of a "pauli-z" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a anti-clockwise rotation around Z-axis of Bloch sphere with an angle given by π/t or depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-x-root-dagger") {
        return 'The "pauli-x-root-dagger" gate is the transpose conjugate of "pauli-x-root" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a clockwise rotation around X-axis of Bloch sphere with an angle given by π/t or, depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-y-root-dagger") {
        return 'The "pauli-y-root-dagger" gate is the transpose conjugate of "pauli-y-root" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a clockwise rotation around Y-axis of Bloch sphere with an angle given by π/t or, depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "pauli-z-root-dagger") {
        return 'The "pauli-z-root-dagger" gate is the transpose conjugate of "pauli-z-root" gate. Because the non integer power of a matrix is not uniquely determined, this gate is defined as a clockwise rotation around Z-axis of Bloch sphere with an angle given by π/t or depending on the chosen parametrization, π/2^k radians.';
    } else if (gateName == "v") {
      return 'This is the square root of the "pauli-x" gate.';
    } else if (gateName == "v-dagger") {
      return 'As hermitian conjugate of "v", this is the inverse square root of the "pauli-x" gate.';
    } else if (gateName == "h") {
      return 'This is the inverse square root of the "pauli-y" gate. It is also called pseudo-Hadamard gate since it also transforms computational basis states to X basis states.';
    }  else if (gateName == "h-dagger") {
      return 'As hermitian conjugate of "h" this is the square root of the "pauli-y" gate.';
    } else if (gateName == "hadamard-xy") {
      return 'The standard "hadamard" gate can be represented as a π rotation around an axis diagonal in the Z-X plane. This gate represented as a π rotation around an axis diagonal in the X-Y plane. It translates the X basis elements (|+⟩ and |-⟩ to the Y basis elements (|+i⟩ and |-i⟩) and back. ';
    } else if (gateName == "hadamard-yz") {
      return 'The standard "hadamard" gate can be represented as a π rotation around an axis diagonal in the Z-X plane. This gate represented as a π rotation around an axis diagonal in the Y-Z plane. It translates the computational basis elements to the Y basis elements (|+i⟩ and |-i⟩) and back. ';
    }  else if (gateName == "hadamard-zx") {
      return 'The standard "hadamard" gate can be represented as a π rotation around an axis diagonal in the Z-X plane. This gate is an alias for standard "hadamard" gate.';
    } else if (gateName == "c") {
      return 'This gate permutes the three axes of the Bloch sphere (X->Y, Y->Z, Z->X). It represents a 120 degree rotation of the Bloch sphere.';
    } else if (gateName == "c-dagger") {
      return 'This is the hermitian conjugate of "c" gate.';
    } else if (gateName == "fswap") {
      return 'This is the fermionic swap gate which swaps adjacent fermionic modes in the Jordan-Wigner representation.';
    }  else if (gateName == "swap-root") {
      return 'This represents a parametrized root of "swap" gate.';
    } else if (gateName == "sqrt-swap-dagger") {
      return 'This is the hermitian conjugate of "sqrt-swap" gate.';
    } else if (gateName == "molmer-sorensen") {
      return 'The Mølmer-Sørensen gate is a natural gate for laser driven trapped ions.';
    } else if (gateName == "xy") {
      return 'This is the "xy" gate.';
    } else if (gateName == "a") {
      return 'This "a" gate conserves the number of 1s (versus 0s) in the computational basis';
    } else if (gateName == "berkeley") {
      return 'This is the Berkeley gate.';
    } else if (gateName == "w") {
      return 'The "w" gate is an orthogonal and hermitian gate and can be used to diagonalize the "swap" gate.';
    } else if (gateName == "ecp") {
      return 'This is the "ecp" gate.';
    } else if (gateName == "magic") {
      return 'The magic gate trasforms computational based to the magic basis.';
    } else if (gateName == "canonical") {
      return 'The canonical gate is a 3-parameter quantum logic gate that acts on two qubits and appears in Kraus-Cirac decomposition.';
    } else if (gateName == "givens") {
      return 'The Givens gate occurs in quantum computational chemistry.';
    }

    return "In order to work with the Circuit Editor use the gates pallete on the left to drag & drop gates in the circuit \
            at the desired position defined by a target qubit and a desired step. Once a gate is placed in the circuit, it's position \
            can be easily adjusted: drag and drop gestures work for both the target and the control qubits. If the Shift key is pressed \
            during performing a drag & drop gesture the original gate is not removed and an identical copy of the gate is created at the \
            drop location in the circuit. For any gate, a single click on a gate pictogram over a target qubit opens a pop-up control which \
            allows editing the gate settings and permits adding or removing controls. This is also the method to assign values for parameters\
            in parametric gates or to assign the index of the classic bit used as mesurement target by measure gates. Clicking over a control \
            qubit opens up a pop-up dialog where control settings can be adjusted. A control can be draged similar to how it's done for regular gate. \
            If the Shift key is pressed during performing a drag & drop gesture, the original control is not removed and a copy of the control is placed \
            at the drop location. Once a gate has been added to the circuit it can be replicated. This permits to generate an arbitrarily large family \
            of gates in a grid array with only a few mouse clicks. Steps or qubits can be removed from a pop-up which is opened by double clicking on an empty cell in \
            the circuit. Ctrl + Click gesture(s) applied on a gate or an empty cell can be used to select a gate or a group of gates. \
            Once gates have been selected Ctrl + C, Ctrl + V, Ctrl + X, Esc and Delete keys work as you would expect. \
            Once a circuit has been created it can be saved in a YAML format or it can  be exported to Qiskit format (other export formats will be \
            available in the future depending on user requests). For exporting circuits follow the MyProjects menu link in the main Uranium website. \
            In order to see in this dashboard help information regarding a particular gate, select the gate in gates pallete and press the help button.";
}

export function retriveControlledGateHelpHtml(gateName) {

  if (gateName == "u3") {
      return 'A "u3" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "u3" gate typically performs a generic (three parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "u2") {
      return 'A "u2" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "u2" gate typically performs a generic (two parameters) unitary operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "hadamard") {
      return 'A "hadamard" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "hadamard" gate typically applies a "hadamard" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "pauli-x") {
      return 'A "pauli-x" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-x" gate typically performs the "pauli-x" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. When it has one control this gate is also known as CNOT gate. When it has two controls this gate is also known as CCNOT or Toffoli gate.';
  } else if (gateName == "pauli-y") {
      return 'A "pauli-y" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-y" gate typically performs the "pauli-y" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
  } else if (gateName == "pauli-z") {
      return 'A "pauli-z" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "pauli-z" gate typically performs the "pauli-z" operation on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. The single controlled "pauli-z" gate is also known as CPHASE gate and has the particular property that is symmetric, which means that swapping the control with the target qubit does not modify the result when applying the gate.';
  } else if (gateName == "u1") {
      return 'A "u1" gate may have any number of controls. The single controlled gate acts on 2 qubits, where one of them acts as a control and the other acts as target. The controlled "u1" gate typically applies the "u1" gate on the target qubit only when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩.';
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
  } else if (gateName == "swap") {
    return 'The simplest controlled swap gate, also known as Fredkin gate, acts on three qubits and performs a controlled swap when the control qubit is |1⟩ otherwise leaves it unchanged. It is however perfectly possible a setup where the control state(s) are |0⟩, |+⟩, |-⟩, |+i⟩ or |-i⟩ instead of |1⟩. The matrix representation of the Fredkin gate is:';
  } else if (gateName == "identity") {
    return '';
  } else if (gateName == "measure-x") {
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
  }  else if (gateName == "swap-root") {
    return 'A "swap-root" gate may have any number of controls.';
  } else if (gateName == "sqrt-swap-dagger") {
    return 'A "sqrt-swap-dagger" gate may have any number of controls.';
  } else if (gateName == "molmer-sorensen") {
    return 'A "molmer-sorensen" gate may have any number of controls.';
  } else if (gateName == "xy") {
    return 'A "xy" gate may have any number of controls.';
  } else if (gateName == "a") {
    return 'A "a" gate may have any number of controls.';
  } else if (gateName == "berkeley") {
    return 'A "berkeley" gate may have any number of controls.';
  } else if (gateName == "w") {
    return 'A "w" gate may have any number of controls.';
  } else if (gateName == "ecp") {
    return 'A "ecp" gate may have any number of controls.';
  } else if (gateName == "magic") {
    return 'A "magic" gate may have any number of controls.';
  } else if (gateName == "canonical") {
    return 'A "canonical" gate may have any number of controls.';
  } else if (gateName == "givens") {
    return 'A "givens" gate may have any number of controls.';
  }

  return "Note on representation of qubit states: the Bloch sphere Z-bazis states are conventionally named: |0⟩ and |1⟩. The Z-basis is usually refered to as the computational or \
  standard basis. The other bases commonly used are the X-basis: |+⟩ = 1/√2(|0⟩ + |1⟩), |-⟩ = 1/√2(|0⟩ - |1⟩) and the Y-basis: |+i⟩ = 1/√2(|0⟩ + i|1⟩), |-i⟩ = 1/√2(|0⟩ - i|1⟩).";
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
            <td style='padding: 2px; text-align: center;'>1</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>exp(-i&nbsp;θ)</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2x; text-align: center;'>0</td>\
        </tr>\
        <tr>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>0</td>\
            <td style='padding: 2px; text-align: center;'>exp(-i&nbsp;θ)</td>\
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
        <div style='font-size:13px;'>exp(i&nbsp;π/2t)</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>-i&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>-i&nbsp;sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-y-root") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <div style='font-size:13px;'>exp(i&nbsp;π/2t)</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
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
        <div style='font-size:13px;'>exp(-i&nbsp;π/2t)</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>i&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>i&nbsp;sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
        </tr>\
        </table>";
    } else if (gateName == "pauli-y-root-dagger") {
        return "<div style='text-align: left;'> Matrix representation:</div> <br/> \
        <div style='font-size:13px;'>exp(-i&nbsp;π/2t)</div> \
        <table class='matrix'> \
        <tr>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>&nbsp;sin(π/2t)</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>-&nbsp;sin(π/2t)</td>\
            <td style='padding: 5px; text-align: center;'>cos(π/2t)</td>\
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
    } else if (gateName == "measure-x") {
        return "";
    } else if (gateName == "measure-y") {
        return "";
    } else if (gateName == "measure-z") {
        return "";
    } else if (gateName == "fswap") {
      return "";
    }  else if (gateName == "swap-root") {
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
          <td style='padding: 5px; text-align: center;'>exp(iπ/2t)&nbsp;cos(π/2t)</td>\
          <td style='padding: 5px; text-align: center;'>-i&nbsp;exp(iπ/2t)&nbsp;sin(π/2t)</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>-i&nbsp;exp(iπ/2t)&nbsp;sin(π/2t)</td>\
          <td style='padding: 5px; text-align: center;'>exp(iπ/2t)&nbsp;cos(π/2t)</td>\
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
          <td style='padding: 5px; text-align: center;'>exp(iπ/2t)&nbsp;cos(π/2t)</td>\
          <td style='padding: 5px; text-align: center;'>-exp(iπ/2t)&nbsp;sin(π/2t)</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(iπ/2t)&nbsp;sin(π/2t)</td>\
          <td style='padding: 5px; text-align: center;'>exp(iπ/2t)&nbsp;cos(π/2t)</td>\
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
          <td style='padding: 5px; text-align: center;'>exp(-iπ/2t)&nbsp;cos(π/2t)</td>\
          <td style='padding: 5px; text-align: center;'>i&nbsp;exp(-iπ/2t)&nbsp;sin(π/2t)</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>i&nbsp;exp(-iπ/2t)&nbsp;sin(π/2t)</td>\
          <td style='padding: 5px; text-align: center;'>exp(-iπ/2t)&nbsp;cos(π/2t)</td>\
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
          <td style='padding: 5px; text-align: center;'>exp(-iπ/2t)&nbsp;cos(π/2t)</td>\
          <td style='padding: 5px; text-align: center;'>-exp(-iπ/2t)&nbsp;sin(π/2t)</td>\
      </tr>\
      <tr>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>0</td>\
          <td style='padding: 5px; text-align: center;'>exp(-iπ/2t)&nbsp;sin(π/2t)</td>\
          <td style='padding: 5px; text-align: center;'>exp(-iπ/2t)&nbsp;cos(π/2t)</td>\
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
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        <tr>\
            <td style='padding: 5px; text-align: center;'>-&nbsp1</td>\
            <td style='padding: 5px; text-align: center;'>1</td>\
        </tr>\
        </table></td></table>";
  }  else if (gateName == "h-dagger") {
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
  }  else if (gateName == "hadamard-zx") {
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
  } else if (gateName == "fswap") {
    return "";
  }  else if (gateName == "swap-root") {
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
  }

  return "";
}

export default {
    retriveSimpleGateHelpHtml,
    retriveGateMatrixHtml,

}
